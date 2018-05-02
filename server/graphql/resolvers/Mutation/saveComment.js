
export const saveComment = ({dependency: {
  Comment,
  Medium,
  Notification,
  User
  }}) => async (_, { userId, mediumId, content }) => {
  const saved = await Comment.create({ userId, mediumId, content });
  const medium = await Medium.increaseCommentsCount(mediumId);
  const toUserId = medium.userId;
  await Notification.saveCommentMediumNotification({userId, toUserId, mediumId, content});
  await User.increaseNotificationsCount(toUserId);
  return saved;
};