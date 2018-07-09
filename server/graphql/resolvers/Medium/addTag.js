
export const createAddTagResolver = ({dependency: {
  Medium,
  TagLink,
}}) => async ({ _id: mediumId }, { tag, byUserId }) => {
  const media = await Medium.findByIdAndUpdate(
    mediumId,
    {$addToSet: {tags: tag}},
    {new: true}
    );
  (async () => await TagLink.increaseSupplies({tags: [tag]}))();
  return media;
};