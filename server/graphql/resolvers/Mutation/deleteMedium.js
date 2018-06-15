import {deleteS3Object} from "../../../services/minio";

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
  const {minioId} = await Medium.findByIdAndDelete(mediumId);
  if (minioId) (async () => await deleteS3Object(minioId))();
  return mediumId;
};