
export const createSaveVideoMediumResolver = ({dependency: {
  Medium,
  ReputationLink,
  User,
  TagLink,
}}) => async (_, { userId, thumbnailMinioId: minioId, videoMinioId, width, aspectRatio, placeholderColor, tags }) => {
  const savedMedium = await Medium.saveVideo({ userId, minioId, videoMinioId, width, aspectRatio, placeholderColor, tags });
  const reputation = await ReputationLink.savePostMediumLink({ userId, mediumId: savedMedium._id, toUserId: userId });
  await User.increaseReputation({userId, reputation: reputation.value});
  await User.increaseGainedReputation({userId, reputation: reputation.value});
  (async ()  => await TagLink.increaseSupplies({tags}))();
  return savedMedium;
};