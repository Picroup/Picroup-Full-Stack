
export const createUnfollowUserResolver = ({dependency: {
  FollowUserLink,
  User,
  }}) => async (_, {userId, toUserId}) => {
  const deleted = await FollowUserLink.findOneAndDelete({userId, toUserId});
  const nothingDeleted = deleted === null;
  if (nothingDeleted) { return await User.findById(toUserId) }
  await User.decreaseFollowingsCount(userId);
  return await User.decreaseFollowersCount(toUserId);
};