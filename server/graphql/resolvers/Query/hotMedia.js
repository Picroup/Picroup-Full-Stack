import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";

export const createHotMediaResolver = ({dependency: {
  Medium
}}) => async () => {

  const { endedAt } = await Medium.findOne().sort({endedAt: -1});
  const randomHalfToOne = 0.5 * Math.random() + 0.5;
  const now = getCurrentTimestamp();
  const maxEndedAt = now + (endedAt - now) * randomHalfToOne;

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