
export const createBlockUserResolver = ({dependency: {
  User
  }}) => async (_, {userId, blockingUserId}) => {
  if (userId === blockingUserId) throw new Error("Can't block my self.");
  await User.addBlockingUserId({userId, blockingUserId});
  return await User.addBlockedUserId({userId: blockingUserId, blockedUserId: userId});
};