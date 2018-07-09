
export const createRemoveTagResolver = ({dependency: {
  Medium,
}}) => async ({ _id: mediumId }, { tag, byUserId }) => {
  return await Medium.findByIdAndUpdate(
    mediumId,
    {$pull: {tags: tag}},
    {new: true}
  );
};