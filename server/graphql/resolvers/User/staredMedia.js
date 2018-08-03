import {cursorQuery, modelsByIds} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {predicateApplyBlockingStrategy} from "../../../usecases/mongoose/Blocking";

export const createStaredMediaResolver = ({dependency: {
  StarMediumLink,
  Medium,
  User,
  }}) => async ({_id: userId}, { cursor, queryUserId }) => {

  const {
    cursor: newCursor,
    items: links
  } = await cursorQuery({
    Model: StarMediumLink,
    predicate: {userId},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});

  const mediumIds = links.map(link => link.mediumId);
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