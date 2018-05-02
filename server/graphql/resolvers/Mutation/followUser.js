
export const followUser = ({dependency: {
  FollowUserLink,
  User,
  ReputationLink,
  Notification,
}}) => async (_, {userId, toUserId}) => {
  await FollowUserLink.saveLink({userId, toUserId});
  await User.increaseFollowersCount(toUserId);
  const updatedUser = await User.increaseFollowingsCount(userId);
  const reputation = await ReputationLink.saveFollowUserLink({userId, toUserId});
  await User.increaseReputation({userId: toUserId, reputation: reputation.value});
  await User.increaseGainedReputation({userId: toUserId, reputation: reputation.value});
  await Notification.saveFollowUserNotification({userId, toUserId});
  await User.increaseNotificationsCount(toUserId);
  return updatedUser;
};