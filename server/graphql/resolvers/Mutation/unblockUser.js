

export  const createUnblockUserResolver = ({dependency: {
  User
}}) => async (_, {userId, blockingUserId}) => {
  await User.pullBlockingUserId({userId, blockingUserId});
  return User.pullBlockedUserId({userId: blockingUserId, blockedUserId: userId});
};