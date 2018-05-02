import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createCommentsResolver = ({dependency: {
  Comment,
}}) => async ({_id: mediumId}, { cursor }) => {
  return await cursorQuery({
    Model: Comment,
    predicate: {mediumId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};