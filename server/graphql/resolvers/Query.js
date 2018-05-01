import RankBy from "../../usecases/model/RankBy";
import {createSaltedPassword} from "../../usecases/crypto";
import { PAGE_LIMIT } from '../../config'
import {cursorQuery} from "../../libraries/mongoose";
import {getCurrentTimestamp} from "../../libraries/date";

export const createQueryResolver = ({dependency: {
  User,
  Medium,
}}) => ({

  login: async (_, args) => {
    args.password = createSaltedPassword(args.password);
    return await User.findOne(args);
  },

  user: async (_, { userId }) => await User.findById(userId),

  rankedMedia: async (_, { rankBy, cursor }) => {
    let predicate = { endedAt: { $gt: getCurrentTimestamp() } };
    if (rankBy) {
      const startTimestamp = RankBy.startTimestamp(rankBy);
      predicate.createdAt = { $gt: startTimestamp };
    }

    return await cursorQuery({
      Model: Medium,
      predicate,
      sortBy: 'endedAt',
      ascending: -1
    })({cursor, limit: PAGE_LIMIT});
  },

  medium: async (_, { mediumId }) => await Medium.findById(mediumId),

});