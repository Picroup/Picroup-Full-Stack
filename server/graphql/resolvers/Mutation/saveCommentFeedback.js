import FeedbackKind from "../../../usecases/model/FeedbackKind";

export const createSaveCommentFeedbackResolver = ({dependency: {
  Feedback,
}}) => async (_, { userId, commentId, content }) => {
  return await Feedback.create({
    userId,
    commentId,
    kind: FeedbackKind.comment,
    content
  });
};