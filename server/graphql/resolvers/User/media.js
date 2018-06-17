import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";

export const createMediaResolver = ({dependency: {
  Medium
  }}) => async ({_id: userId}, {cursor}) => {
  return await cursorQuery({
    Model: Medium,
    predicate: {userId, endedAt: {$gt: getCurrentTimestamp()}},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};