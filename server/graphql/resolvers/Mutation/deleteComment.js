
export const createDeleteCommentResolver = ({dependency: {
  Comment,
  Medium,
}}) => async (_, { commentId }) => {
  const deleted = await Comment.findByIdAndDelete(commentId);
  const nothingDeleted = deleted === null;
  if (nothingDeleted) { return commentId }
  await Medium.decreaseCommentsCount(deleted.mediumId);
  return commentId;
};