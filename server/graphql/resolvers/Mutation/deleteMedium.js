import {remove} from "../../../usecases/minio/index";

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
  const {minioId, detail} = await Medium.findByIdAndDelete(mediumId);
  if (minioId) (async () => await remove({minioId}))();
  if (detail && detail.videoMinioId) (async () => await remove({minioId: detail.videoMinioId}))();
  return mediumId;
};