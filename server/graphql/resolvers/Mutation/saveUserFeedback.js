import FeedbackKind from "../../../usecases/model/FeedbackKind";

export const createSaveUserFeedbackResolver = ({dependency: {
  Feedback,
}}) => async (_, { userId, toUserId, content }) => {
  return await Feedback.create({
    userId,
    toUserId,
    kind: FeedbackKind.user,
    content
  });
};