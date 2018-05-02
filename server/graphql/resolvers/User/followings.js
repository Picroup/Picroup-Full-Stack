import {cursorQuery, modelsByIds} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createFollowingsResolver = ({dependency: {
  FollowUserLink,
  User
  }}) => async ({_id: userId}, { cursor }) => {
  const { cursor: newCursor, items: links } = await cursorQuery({
    Model: FollowUserLink,
    predicate: {userId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});

  const followingUserIds = links.map(link => link.toUserId);
  const users = await modelsByIds(User, followingUserIds);

  return {
    cursor: newCursor,
    items: users
  }
};