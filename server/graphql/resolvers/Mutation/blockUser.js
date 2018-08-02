
export const createBlockUserResolver = ({dependency: {
  User
  }}) => async (_, {userId, blockingUserId}) => {
  await User.addBlockingUserId({userId, blockingUserId});
  return await User.addBlockedUserId({userId: blockingUserId, blockedUserId: userId});
};