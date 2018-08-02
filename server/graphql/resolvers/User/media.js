import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {predicateApplyBlockingStrategy} from "../../../usecases/mongoose/Blocking";

export const createMediaResolver = ({dependency: {
  Medium,
  User,
  }}) => async ({_id: userId}, {cursor, queryUserId}) => {
  const predicate = await predicateApplyBlockingStrategy({User})({
    userId: queryUserId,
    predicate: {userId, endedAt: {$gt: getCurrentTimestamp()}}
  });
  return await cursorQuery({
    Model: Medium,
    predicate: predicate,
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};