import Medium from "../../usecases/mongoose/Medium";
import {createSaltedPassword} from "../../usecases/crypto";
import FollowUserLink from "../../usecases/mongoose/FollowUserLink";
import User from "../../usecases/mongoose/User";
import Comment from "../../usecases/mongoose/Comment";
import StarMediumLink from "../../usecases/mongoose/StarMediumLink";
import {oneWeek} from "../../libraries/date/index";
import ReputationLink from "../../usecases/mongoose/ReputationLink";

export default {

  register: async (_, args) => {
    args.password = createSaltedPassword(args.password);
    return await User.create(args);
  },

  saveImageMedium: async (_, { userId, minioId, width, aspectRatio, category }) => {
    const savedMedium = await Medium.saveImage({ userId, minioId, width, aspectRatio, category });
    const reputation = await ReputationLink.savePostMediumLink({ userId, mediumId: savedMedium._id, toUserId: userId });
    await User.increaseReputation({userId, reputation: reputation.value});
    return savedMedium;
  },

  followUser: async (_, {userId, toUserId}) => {
    await FollowUserLink.saveLink({userId, toUserId});
    await User.increaseFollowersCount(toUserId);
    const updatedUser = await User.increaseFollowingsCount(userId);
    const reputation = await ReputationLink.saveFollowUserLink({userId, toUserId});
    await User.increaseReputation({userId: toUserId, reputation: reputation.value});
    return updatedUser;
  },

  unfollowUser: async (_, {userId, toUserId}) => {
    const removed = await FollowUserLink.removeLink({userId, toUserId});
    const nothingRemoved = removed.n === 0;
    if (nothingRemoved) { return await User.findById(userId)}
    await User.decreaseFollowersCount(toUserId);
    return await User.decreaseFollowingsCount(userId);
  },

  saveComment: async (_, { userId, mediumId, content }) => {
    const saved = await Comment.create({ userId, mediumId, content });
    await Medium.increaseCommentsCount(mediumId);
    return saved;
  },

  starMedium: async (_, {userId, mediumId}) => {
    await StarMediumLink.saveLink({userId, mediumId});
    const updatedMedium = await Medium.increaseEndedAt({mediumId, duration: oneWeek});
    const toUserId = updatedMedium.userId;
    const reputation = await ReputationLink.saveStarMediumLink({userId, mediumId, toUserId});
    await User.increaseReputation({userId: toUserId, reputation: reputation.value});
    return updatedMedium
  }
};