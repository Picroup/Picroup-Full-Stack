
const saveFollowUserLink = ({dependency: {
  ReputationLink,
  User,
  Notification,
}}) => async ({userId, toUserId}) => {
    const reputation = await ReputationLink.saveFollowUserLink({userId, toUserId});
    await User.increaseReputation({userId: toUserId, reputation: reputation.value});
    await User.increaseGainedReputation({userId: toUserId, reputation: reputation.value});
    await Notification.saveFollowUserNotification({userId, toUserId});
    await User.increaseNotificationsCount(toUserId);
};

export const createFollowUserResolver = ({dependency: {
  FollowUserLink,
  User,
  ReputationLink,
  Notification,
}}) => async (_, {userId, toUserId}) => {
  await FollowUserLink.saveLink({userId, toUserId});
  const updatedUser = await User.increaseFollowersCount(toUserId);
  await User.increaseFollowingsCount(userId);
  try {
    await saveFollowUserLink({dependency: {ReputationLink, User, Notification}})({userId, toUserId});
  } catch (error) {
    console.error(error)
  }
  return updatedUser;
};