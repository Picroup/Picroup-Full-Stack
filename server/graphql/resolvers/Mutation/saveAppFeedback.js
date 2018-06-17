import FeedbackKind from "../../../usecases/model/FeedbackKind";

export const createSaveAppFeedbackResolver = ({dependency: {
  Feedback,
}}) => async (_, { userId, content }) => {
  return await Feedback.create({
    userId,
    kind: FeedbackKind.app,
    content
  });
};