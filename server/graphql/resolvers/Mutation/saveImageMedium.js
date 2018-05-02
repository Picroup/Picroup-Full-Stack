
export const createSaveImageMediumResolver = ({dependency: {
  Medium,
  ReputationLink,
  User,
}}) => async (_, { userId, minioId, width, aspectRatio }) => {
  const savedMedium = await Medium.saveImage({ userId, minioId, width, aspectRatio });
  const reputation = await ReputationLink.savePostMediumLink({ userId, mediumId: savedMedium._id, toUserId: userId });
  await User.increaseReputation({userId, reputation: reputation.value});
  await User.increaseGainedReputation({userId, reputation: reputation.value});
  return savedMedium;
};