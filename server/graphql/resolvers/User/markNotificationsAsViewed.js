

export const createMarkNotificationsAsViewedResolver = ({dependency: {
  Notification,
  User
  }}) => async ({_id: userId}) => {
  await Notification.markNotificationsAsViewed(userId);
  return await User.clearNotificationsCount(userId);
};