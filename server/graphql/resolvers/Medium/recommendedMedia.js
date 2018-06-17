import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createRecommendedMediaResolver = ({dependency: {
    MediumRecommendLink,
    Medium,
}}) => async ({_id: mediumId}, { cursor }) => {

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
  const media = await Medium.validModelsByIds(mediumIds);

  return {
    cursor: newCursor,
    items: media
  };
};