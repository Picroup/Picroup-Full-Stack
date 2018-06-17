import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {random} from "../../../libraries/math";

export const createHotMediaResolver = ({dependency: {
  Medium
}}) => async () => {

  const now = getCurrentTimestamp();

  const items = await Medium.aggregate([
    {$match: {endedAt: {$gt: now}}},
    {$sample: {size: PAGE_LIMIT }}
  ]);

  return {
    cursor: null,
    items
  };
};