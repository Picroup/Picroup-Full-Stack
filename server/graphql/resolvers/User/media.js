import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createMediaResolver = ({dependency: {
  Medium
  }}) => async ({_id: userId}, {cursor}) => {
  return await cursorQuery({
    Model: Medium,
    predicate: {userId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};