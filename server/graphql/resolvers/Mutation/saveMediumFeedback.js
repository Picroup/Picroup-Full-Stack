import FeedbackKind from "../../../usecases/model/FeedbackKind";

export const createSaveMediumFeedbackResolver = ({dependency: {
  Feedback,
}}) => async (_, { userId, mediumId, content }) => {
  return await Feedback.create({
    userId,
    mediumId,
    kind: FeedbackKind.medium,
    content
  });
};