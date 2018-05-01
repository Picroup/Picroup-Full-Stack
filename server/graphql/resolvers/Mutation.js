import {createSaltedPassword} from "../../usecases/crypto";
import {oneWeek} from "../../libraries/date/index";

export const createMutationResolver = ({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
  Notification,
  MediumRecommendLink,
}}) => ({

  register: async (_, args) => {
    args.password = createSaltedPassword(args.password);
    return await User.create(args);
  },

  saveImageMedium: async (_, { userId, minioId, width, aspectRatio }) => {
    const savedMedium = await Medium.saveImage({ userId, minioId, width, aspectRatio });
    const reputation = await ReputationLink.savePostMediumLink({ userId, mediumId: savedMedium._id, toUserId: userId });
    await User.increaseReputation({userId, reputation: reputation.value});
    await User.increaseGainedReputation({userId, reputation: reputation.value});
    return savedMedium;
  },

  followUser: async (_, {userId, toUserId}) => {
    await FollowUserLink.saveLink({userId, toUserId});
    await User.increaseFollowersCount(toUserId);
    const updatedUser = await User.increaseFollowingsCount(userId);
    const reputation = await ReputationLink.saveFollowUserLink({userId, toUserId});
    await User.increaseReputation({userId: toUserId, reputation: reputation.value});
    await User.increaseGainedReputation({userId: toUserId, reputation: reputation.value});
    await Notification.saveFollowUserNotification({userId, toUserId});
    await User.increaseNotificationsCount(toUserId);
    return updatedUser;
  },

  unfollowUser: async (_, {userId, toUserId}) => {
    const removed = await FollowUserLink.removeLink({userId, toUserId});
    const nothingRemoved = removed.n === 0;
    if (nothingRemoved) { return await User.findById(userId)}
    await User.decreaseFollowersCount(toUserId);
    return await User.decreaseFollowingsCount(userId);
  },

  saveComment: async (_, { userId, mediumId, content }) => {
    const saved = await Comment.create({ userId, mediumId, content });
    const medium = await Medium.increaseCommentsCount(mediumId);
    const toUserId = medium.userId;
    await Notification.saveCommentMediumNotification({userId, toUserId, mediumId, content});
    await User.increaseNotificationsCount(toUserId);
    return saved;
  },

  starMedium: async (_, {userId, mediumId}) => {
    await StarMediumLink.saveLink({userId, mediumId});
    const updatedMedium = await Medium.increaseEndedAt({mediumId, duration: oneWeek});
    const toUserId = updatedMedium.userId;
    const reputation = await ReputationLink.saveStarMediumLink({userId, mediumId, toUserId});
    await User.increaseReputation({userId: toUserId, reputation: reputation.value});
    await User.increaseGainedReputation({userId: toUserId, reputation: reputation.value});
    await Notification.saveStartMediumNotification({userId, toUserId, mediumId});
    await User.increaseNotificationsCount(toUserId);
    return updatedMedium
  },

  recommendMedium: async (_, {mediumId, recommendMediumId}) => {
    return await MediumRecommendLink.increaseVote({mediumId, recommendMediumId})
      .then(link => link.vote);
  }
});