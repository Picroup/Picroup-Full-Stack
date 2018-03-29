import Medium from "../../usecase/mongoose/Medium";
import {createSaltedPassword} from "../../usecase/crypto";
import FollowUserLink from "../../usecase/mongoose/FollowUserLink";
import User from "../../usecase/mongoose/User";

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
    return await medium.save();
  },

  followUser: async (_, {userId, toUserId}) => {
    const unique = userId + toUserId;
    const followUserLink = new FollowUserLink({
      unique,
      userId,
      toUserId
    });
    await followUserLink.save();
    await User.findOneAndUpdate({_id: toUserId}, { $inc: {followersCount: 1} });
    return await User.findOneAndUpdate({_id: userId}, { $inc: {followingsCount: 1} }, {new: true})
  },

  unfollowUser: async (_, {userId, toUserId}) => {
    const unique = userId + toUserId;
    const removed = await FollowUserLink.remove({ unique });
    const nothingRemoved = removed.n === 0;
    if (nothingRemoved) { return await User.findOne({_id: userId})}
    await User.findOneAndUpdate({_id: toUserId}, { $inc: {followersCount: -1} });
    return await User.findOneAndUpdate({_id: userId}, { $inc: {followingsCount: -1} }, {new: true})
  }
};