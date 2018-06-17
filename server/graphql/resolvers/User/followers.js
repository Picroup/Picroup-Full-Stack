import {cursorQuery, modelsByIds} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createFollowersResolver = ({dependency: {
  FollowUserLink,
  User
  }}) => async ({_id: userId}, { cursor }) => {

  const { cursor: newCursor, items: links } = await cursorQuery({
    Model: FollowUserLink,
    predicate: { toUserId: userId },
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});

  const followerUserIds = links.map(link => link.userId);
  const users = await modelsByIds(User, followerUserIds);

  return {
    cursor: newCursor,
    items: users
  }
};