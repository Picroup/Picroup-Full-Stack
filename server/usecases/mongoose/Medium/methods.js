import schema from './schema'
import Medium from "./index";
import {incrementByKey, modelsByIds} from "../../../libraries/mongoose";
import {getCurrentTimestamp} from "../../../libraries/date";
import MediumKind from "../../model/MediumKind";

schema.statics.saveImage = async ({ userId, minioId, width, aspectRatio, placeholderColor, tags }) => {
  const medium = new Medium({
    userId,
    minioId,
    tags,
    kind: MediumKind.image,
    detail: { width, aspectRatio, placeholderColor }
  });
  return await medium.save();
};

schema.statics.saveVideo = async ({ userId, minioId, videoMinioId, width, aspectRatio, placeholderColor, tags }) => {
  const medium = new Medium({
    userId,
    minioId,
    tags,
    kind: MediumKind.video,
    detail: { width, aspectRatio, videoMinioId, placeholderColor }
  });
  return await medium.save();
};

schema.statics.increaseCommentsCount = async (mediumId) => {
  return await incrementByKey({
    Model: Medium,
    _id: mediumId,
    key: 'commentsCount',
    number: 1
  })
};

schema.statics.decreaseCommentsCount = async (mediumId) => {
  return await incrementByKey({
    Model: Medium,
    _id: mediumId,
    key: 'commentsCount',
    number: -1
  })
};

schema.statics.increaseEndedAt = async ({mediumId, duration}) => {
  return await incrementByKey({
    Model: Medium,
    _id: mediumId,
    key: 'endedAt',
    number: duration
  })
};

schema.statics.validModelsByIds = async (ids) => {
  return await modelsByIds(Medium, ids, {endedAt: {$gt: getCurrentTimestamp()}});
};

export default schema;