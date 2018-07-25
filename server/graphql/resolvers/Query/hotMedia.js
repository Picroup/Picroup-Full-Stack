import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp, oneWeek} from "../../../libraries/date";

export const createHotMediaResolver = ({dependency: {
  Medium
}}) => async () => {

  const now = getCurrentTimestamp();
  const endedAt = now + 2 * oneWeek;

  const items = await Medium.aggregate([
    {$match: {endedAt: {$gt: endedAt}}},
    {$sample: {size: PAGE_LIMIT }}
  ]);

  return {
    cursor: null,
    items
  };
};

export const createHotMediaByTagsResolver = ({dependency: {
  Medium
}}) => async (_, { tags }) => {

  const now = getCurrentTimestamp();
  const endedAt = now + 2 * oneWeek;
  const tagsPredicate = tags && { tags: { $all: tags } };

  const items = await Medium.aggregate([
    {$match: {endedAt: {$gt: endedAt}, ...tagsPredicate}},
    {$sample: {size: PAGE_LIMIT }}
  ]);

  return {
    cursor: null,
    items
  };
};