import schedule from 'node-schedule';
import {createDeleteMediumResolver} from "../graphql/resolvers/Mutation/deleteMedium";
import StarMediumLink from "../usecases/mongoose/StarMediumLink";
import MediumRecommendLink from "../usecases/mongoose/MediumRecommendLink";
import Comment from "../usecases/mongoose/Comment";
import Medium from "../usecases/mongoose/Medium";
import {getCurrentTimestamp, oneDay} from "../libraries/date";

const deleteMedium = createDeleteMediumResolver({dependency: {
    StarMediumLink,
    MediumRecommendLink,
    Comment,
    Medium,
  }});

const clearExpiredMedia = async () => {
  const now = getCurrentTimestamp();
  const criticalEndedAt = now - 30 * oneDay;
  const expiredMedia = await Medium.find({endedAt: { $lt: criticalEndedAt }}).select({_id: 1, endedAt: 1}).limit(0);
  const mediumIds = expiredMedia.map(medium => medium._id);
  for (const mediumId of mediumIds) await deleteMedium({}, {mediumId})
  console.log(`\nclearExpiredMedia expiredMedia: ${expiredMedia}`);
  console.log(`\nclearExpiredMedia mediumIds: ${mediumIds}`);
  console.log(`\nclearExpiredMedia count: ${mediumIds.length}`);
};

export const scheduleJob = () => {
  // clear expired media very day at 4:00 AM
  schedule.scheduleJob({hour: 4}, clearExpiredMedia)
};