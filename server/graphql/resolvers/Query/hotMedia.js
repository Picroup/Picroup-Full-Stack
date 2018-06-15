import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {random} from "../../../libraries/math";

export const createHotMediaResolver = ({dependency: {
  Medium
}}) => async () => {

  const now = getCurrentTimestamp();
  const { endedAt: maxEndedAt } = await Medium.findOne().sort({endedAt: -1});
  const { endedAt: minEndedAt } = await Medium.findOne({ endedAt: {$gt: now} }).sort({endedAt: 1});
  const randomValue = random({min: 0.1, max: 1.0});
  const randomEndedAt = minEndedAt + (maxEndedAt - minEndedAt) * randomValue;

  const items = await Medium
    .find({ endedAt: {$lte: randomEndedAt} })
    .sort({endedAt: -1})
    .limit(PAGE_LIMIT)
    .exec();

  return {
    cursor: null,
    items
  };
};