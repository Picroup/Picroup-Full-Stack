import {startTimestampFromRankBy} from "../../usecase/model/SortBy";
import Medium from "../../usecase/mongoose/Medium";
import {createSaltedPassword} from "../../usecase/crypto";
import User from "../../usecase/mongoose/User";
import { PAGE_LIMIT } from '../../config'

export default {

  login: async (_, args) => {
    args.password = createSaltedPassword(args.password);
    return await User.findOne(args);
  },

  user: async (_, { userId }) => await User.findOne({_id: userId}),

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
};