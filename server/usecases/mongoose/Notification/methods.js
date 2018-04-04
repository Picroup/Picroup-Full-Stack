import schema from './schema';
import Notification from "./index";
import NotificationKind from "../../model/NotificationKind";

schema.statics.saveCommentMediumNotification = async ({userId, toUserId, mediumId, content}) => {

  const notification = new Notification({
    userId,
    toUserId,
    mediumId,
    content,
    kind: NotificationKind.commentMedium
  });

  return await notification.save();
};

schema.statics.saveStartMediumNotification = async ({userId, toUserId, mediumId}) => {

  const notification = new Notification({
    userId,
    toUserId,
    mediumId,
    kind: NotificationKind.starMedium
  });

  return await notification.save();
};

schema.statics.saveFollowUserNotification = async ({userId, toUserId}) => {

  const notification = new Notification({
    userId,
    toUserId,
    kind: NotificationKind.followUser
  });

  return await notification.save();
};

schema.statics.markNotificationsAsViewed = async (userId) => {
  return await Notification.update({ toUserId: userId }, { $set: {viewed: true} }, {multi: true});
};

export default schema;