import schedule from 'node-schedule';
import {createDeleteMediumResolver} from "../graphql/resolvers/Mutation/deleteMedium";
import StarMediumLink from "../usecases/mongoose/StarMediumLink";
import MediumRecommendLink from "../usecases/mongoose/MediumRecommendLink";
import Comment from "../usecases/mongoose/Comment";
import Medium from "../usecases/mongoose/Medium";
import {getCurrentTimestamp, maybeOneMonth} from "../libraries/date";

const deleteMedium = createDeleteMediumResolver({dependency: {
    StarMediumLink,
    MediumRecommendLink,
    Comment,
    Medium,
  }});

const clearExpiredMedia = async () => {
  const now = getCurrentTimestamp();
  const criticalEndedAt = now - maybeOneMonth;
  const expiredMedia = await Medium.find({endedAt: { $lt: criticalEndedAt }}).select({_id: 1}).limit(0);
  const mediumIds = expiredMedia.map(medium => medium._id);
  for (const mediumId of mediumIds) await deleteMedium({}, {mediumId})
  console.log(`clearExpiredMedia count: ${mediumIds.count}`);
  console.log(`clearExpiredMedia ids: ${mediumIds}`);
};

export const scheduleJob = () => {
  // clear expired media very day at 3:00 AM
  schedule.scheduleJob({hour: 3}, clearExpiredMedia)
};