import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createNotificationsResolver = ({dependency: {
  Notification
  }}) => async ({_id: userId},{ cursor }) => {
  return await cursorQuery({
    Model: Notification,
    predicate: {toUserId:userId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};