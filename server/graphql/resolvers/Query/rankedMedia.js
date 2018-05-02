import {getCurrentTimestamp} from "../../../libraries/date";
import RankBy from "../../../usecases/model/RankBy";
import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createRankedMediaResolver = ({dependency: {
  Medium
  }}) => async (_, { rankBy, cursor }) => {
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
};