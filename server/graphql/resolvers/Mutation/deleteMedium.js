
export const createDeleteMediumResolver = ({dependency: {
  StarMediumLink,
  MediumRecommendLink,
  Comment,
  Medium,
}}) => async (_, { mediumId }) => {
  await StarMediumLink.deleteMany({mediumId});
  await MediumRecommendLink.deleteMany({mediumId});
  await MediumRecommendLink.deleteMany({recommendMediumId: mediumId});
  await Comment.deleteMany({mediumId});
  await Medium.findByIdAndDelete(mediumId);
  return mediumId;
};