
export const createUnfollowUserResolver = ({dependency: {
  FollowUserLink,
  User,
  }}) => async (_, {userId, toUserId}) => {
  const removed = await FollowUserLink.removeLink({userId, toUserId});
  const nothingRemoved = removed.n === 0;
  if (nothingRemoved) { return await User.findById(toUserId) }
  await User.decreaseFollowingsCount(userId);
  return await User.decreaseFollowersCount(toUserId);
};