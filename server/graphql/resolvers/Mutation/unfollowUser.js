
export const createUnfollowUserResolver = ({dependency: {
  FollowUserLink,
  User,
  }}) => async (_, {userId, toUserId}) => {
  const removed = await FollowUserLink.findOneAndDelete({userId, toUserId});
  const nothingRemoved = removed === null;
  if (nothingRemoved) { return await User.findById(toUserId) }
  await User.decreaseFollowingsCount(userId);
  return await User.decreaseFollowersCount(toUserId);
};