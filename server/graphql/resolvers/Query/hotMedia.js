import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp, oneWeek} from "../../../libraries/date";
import {predicateApplyBlockingStrategy} from "../../../usecases/mongoose/Blocking";

const distinctItems = (items) => {
  const itemByIds = items.reduce((total, item) => ({
    ...total,
    [item._id]: item
  }), {});
  return Object.values(itemByIds)
};

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
     items: distinctItems(items)
  };
};

export const createHotMediaByTagsResolver = ({dependency: {
  Medium,
  User,
}}) => async (_, { tags, queryUserId }) => {

  const now = getCurrentTimestamp();
  const endedAt = now + 2 * oneWeek;
  const tagsPredicate = tags && { tags: { $all: tags } };
  const predicate = await predicateApplyBlockingStrategy({User})({
    userId: queryUserId,
    predicate: {endedAt: {$gt: endedAt}, ...tagsPredicate}
  });
  const items = await Medium.aggregate([
    {$match: predicate},
    {$sample: {size: PAGE_LIMIT }}
  ]);

  return {
    cursor: null,
    items: distinctItems(items)
  };
};