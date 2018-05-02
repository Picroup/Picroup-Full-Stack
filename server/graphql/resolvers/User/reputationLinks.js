import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";


export const createReputationLinksResolver = ({dependency: {
  ReputationLink
  }}) => async ({_id: userId},{ cursor }) => {
  return await cursorQuery({
    Model: ReputationLink,
    predicate: {toUserId:userId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};