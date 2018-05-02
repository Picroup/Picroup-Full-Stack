
export const createUnfollowUserResolver = ({dependency: {
  FollowUserLink,
  User,
  }}) => async (_, {userId, toUserId}) => {
  const removed = await FollowUserLink.removeLink({userId, toUserId});
  const nothingRemoved = removed.n === 0;
  if (nothingRemoved) { return await User.findById(userId)}
  await User.decreaseFollowersCount(toUserId);
  return await User.decreaseFollowingsCount(userId);
};