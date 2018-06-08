import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {random} from "../../../libraries/math";

export const createHotMediaResolver = ({dependency: {
  Medium
}}) => async () => {

  const { endedAt } = await Medium.findOne().sort({endedAt: -1});
  const randomValue = random({min: 0.1, max: 1.0});
  const now = getCurrentTimestamp();
  const maxEndedAt = now + (endedAt - now) * randomValue;

  const items = await Medium
    .find({ endedAt: {$lte: maxEndedAt} })
    .sort({endedAt: -1})
    .limit(PAGE_LIMIT)
    .exec();

  return {
    cursor: null,
    items
  };
};