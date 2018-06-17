import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createStaredMediaResolver = ({dependency: {
  StarMediumLink,
  Medium
  }}) => async ({_id: userId}, { cursor }) => {

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
  const media = await Medium.validModelsByIds(mediumIds);

  return {
    cursor: newCursor,
    items: media
  };
};