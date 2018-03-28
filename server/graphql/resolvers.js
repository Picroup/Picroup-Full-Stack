import User from "../usecase/mongoose/User";
import {createSaltedPassword} from "../usecase/crypto";
import {loginUserNotFoundError} from "./errors";
import Medium from "../usecase/mongoose/Medium";
import {startTimestampFromRankBy} from "../usecase/model/SortBy";
import {PAGE_LIMIT} from "../config";
import FollowUserLink from "../usecase/mongoose/FollowUserLink";

export default {
  Query: {
    login: async (_, args) => {
      args.password = createSaltedPassword(args.password);
      const user = await User.findOne(args);
      if (!user) { throw loginUserNotFoundError() }
      return user;
    },

    rankedMedia: async (_, { category, rankBy, cursor }) => {
      const startTimestamp = startTimestampFromRankBy(rankBy);
      let predicate = { createdAt: { $gt: startTimestamp } };
      if (category) predicate.category = category;
      if (cursor) predicate.endedAt = { $lt: cursor };

      const media = await Medium.find(predicate)
        .sort({endedAt: -1})
        .limit(PAGE_LIMIT)
        .exec();

      const hasMore = media.length === PAGE_LIMIT;
      const newCursor = hasMore ? media.last().endedAt : null;

      return {
        cursor: newCursor,
        media
      }
    },

    interestedMedia: async (_, { userId, cursor }) => {

      return {
        cursor: null,
        media: []
      }
    }
},
  Mutation: {
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
  }
};