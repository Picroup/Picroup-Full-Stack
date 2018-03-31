import Medium from "../../usecases/mongoose/Medium";
import {createSaltedPassword} from "../../usecases/crypto";
import FollowUserLink from "../../usecases/mongoose/FollowUserLink";
import User from "../../usecases/mongoose/User";
import Comment from "../../usecases/mongoose/Comment";
import StarMediumLink from "../../usecases/mongoose/StarMediumLink";
import {oneWeek} from "../../libraries/date/index";
import ReputationLink from "../../usecases/mongoose/ReputationLink";
import {FOLLOW_USER, SAVE_MEDIUM, STAR_MEDIUM} from "../../usecases/model/ReputationKind";

export default {

  register: async (_, args) => {
    args.password = createSaltedPassword(args.password);
    const user = new User(args);
    return await user.save();
  },

  saveImageMedium: async (_, { userId, minioId, width, aspectRatio, category }) => {
    const medium = new Medium({
      userId,
      minioId,
      category,
      kind: 'image',
      detail: { width, aspectRatio }
    });
    const savedMedium = await medium.save();

    const mediumId = savedMedium._id;
    const kind = SAVE_MEDIUM;
    const reputationUnique = `${kind}_${mediumId}`;
    const value = 1;

    const reputation = new ReputationLink({
      userId,
      mediumId,
      toUserId: userId,
      kind,
      unique: reputationUnique,
      value
    });
    await reputation.save();

    await User.findOneAndUpdate({_id: userId}, {$inc: { reputation: value }});
    return savedMedium;
  },

  followUser: async (_, {userId, toUserId}) => {
    const unique = `${userId}_${toUserId}`;
    const followUserLink = new FollowUserLink({
      unique,
      userId,
      toUserId
    });
    await followUserLink.save();
    await User.findOneAndUpdate({_id: toUserId}, { $inc: {followersCount: 1} });
    const updatedUser = await User.findOneAndUpdate({_id: userId}, { $inc: {followingsCount: 1} }, {new: true});

    const kind = FOLLOW_USER;
    const reputationUnique = `${kind}_${userId}_${toUserId}`;
    const value = 50;

    const reputation = new ReputationLink({
      userId,
      toUserId,
      kind,
      unique: reputationUnique,
      value
    });

    await reputation.save();
    await User.findOneAndUpdate({_id: toUserId}, { $inc: { reputation: value } });

    return updatedUser;
  },

  unfollowUser: async (_, {userId, toUserId}) => {
    const unique = `${userId}_${toUserId}`;
    const removed = await FollowUserLink.remove({ unique });
    const nothingRemoved = removed.n === 0;
    if (nothingRemoved) { return await User.findOne({_id: userId})}
    await User.findOneAndUpdate({_id: toUserId}, { $inc: {followersCount: -1} });
    return await User.findOneAndUpdate({_id: userId}, { $inc: {followingsCount: -1} }, {new: true})
  },

  saveComment: async (_, { userId, mediumId, content }) => {

    const comment = new Comment({
      userId,
      mediumId,
      content,
    });
    const saved = await comment.save();
    await Medium.findOneAndUpdate({_id: mediumId}, { $inc: { commentsCount: 1 } });
    return saved;
  },

  starMedium: async (_, {userId, mediumId}) => {
    const unique = `${userId}_${mediumId}`;
    const starMediumLink = new StarMediumLink({
      unique,
      userId,
      mediumId,
    });
    await starMediumLink.save();

    const updatedMedium = await Medium.findOneAndUpdate({_id: mediumId}, { $inc: {endedAt: oneWeek} }, {new: true});

    const toUserId = updatedMedium.userId;
    const kind = STAR_MEDIUM;
    const reputationUnique = `${kind}_${userId}_${mediumId}`;
    const value = 10;

    const reputation = new ReputationLink({
      userId,
      mediumId,
      toUserId,
      kind,
      unique: reputationUnique,
      value
    });

    await reputation.save();
    await User.findOneAndUpdate({_id: toUserId}, {$inc: { reputation: value }});

    return updatedMedium
  }
};