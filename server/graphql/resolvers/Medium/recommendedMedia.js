import {cursorQuery, modelsByIds} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {predicateApplyBlockingStrategy} from "../../../usecases/mongoose/Blocking";

export const createRecommendedMediaResolver = ({dependency: {
  MediumRecommendLink,
  Medium,
  User,
}}) => async ({_id: mediumId}, { cursor, queryUserId }) => {

  const {
    cursor: newCursor,
    items: links
  } = await cursorQuery({
    Model: MediumRecommendLink,
    predicate: {mediumId},
    sortBy: 'vote',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});

  const mediumIds = links.map(link => link.recommendMediumId);
  const predicate = await predicateApplyBlockingStrategy({User})({
    userId: queryUserId,
    predicate: {endedAt: {$gt: getCurrentTimestamp()}}
  });
  const media = await modelsByIds(Medium, mediumIds, predicate);

  return {
    cursor: newCursor,
    items: media
  };
};