import {oneWeek} from "../../../libraries/date";

export const createStarMediumResolver = ({dependency: {
  StarMediumLink,
  Medium,
  ReputationLink,
  User,
  Notification
  }}) => async (_, {userId, mediumId}) => {
  await StarMediumLink.saveLink({userId, mediumId});
  const updatedMedium = await Medium.increaseEndedAt({mediumId, duration: oneWeek});
  const toUserId = updatedMedium.userId;
  const reputation = await ReputationLink.saveStarMediumLink({userId, mediumId, toUserId});
  await User.increaseReputation({userId: toUserId, reputation: reputation.value});
  await User.increaseGainedReputation({userId: toUserId, reputation: reputation.value});
  if (toUserId.equals(userId)) return updatedMedium;
  await Notification.saveStartMediumNotification({userId, toUserId, mediumId});
  await User.increaseNotificationsCount(toUserId);
  return updatedMedium
};