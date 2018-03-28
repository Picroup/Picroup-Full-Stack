import User from "../usecase/mongoose/User";
import {createSaltedPassword} from "../usecase/crypto";
import {loginUserNotFoundError} from "./errors";
import Medium from "../usecase/mongoose/Medium";
import {startTimestampFromRankBy} from "../usecase/model/SortBy";
import {PAGE_LIMIT} from "../config";


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
      let condition = { createdAt: { $gt: startTimestamp } };
      if (category) condition.category = category;
      if (cursor) condition.endedAt = { $lt: cursor };

      const media = await Medium.find(condition)
        .sort({endedAt: -1})
        .limit(PAGE_LIMIT)
        .exec();

      const hasMore = media.length === PAGE_LIMIT;
      const newCursor = hasMore ? media.last().endedAt : null;

      return {
        cursor: newCursor,
        media
      }
    }
},
  Mutation: {
    register: async (_, args) => {
      args.password = createSaltedPassword(args.password);
      const user = new User(args);
      return await user.save();
    },
    saveImageMedium: async (obj, { userId, minioId, width, aspectRatio, category }, context, info) => {
      const medium = new Medium({
        userId,
        minioId,
        category,
        kind: 'image',
        detail: { width, aspectRatio }
      });
      return await medium.save();
    }
  }
};