import schema from './schema'
import Medium from "./index";
import {incrementByKey} from "../../../libraries/mongoose";

schema.statics.saveImage = async ({ userId, minioId, width, aspectRatio }) => {
  const medium = new Medium({
    userId,
    minioId,
    kind: 'image',
    detail: { width, aspectRatio }
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

schema.statics.increaseEndedAt = async ({mediumId, duration}) => {
  return await incrementByKey({
    Model: Medium,
    _id: mediumId,
    key: 'endedAt',
    number: duration
  })
};

export default schema;