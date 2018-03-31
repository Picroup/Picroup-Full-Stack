import {getCurrentTimestamp} from "../../libraries/date";
import {maybeOneMonth, oneDay, oneWeek} from "../../libraries/date/index";

const startTimestampFromRankBy = (rankBy) => {
  switch (rankBy) {
    case 'today':
      return getCurrentTimestamp() - oneDay;
    case 'thisWeek':
      return getCurrentTimestamp() - oneWeek;
    case 'thisMonth':
      return getCurrentTimestamp() - maybeOneMonth;
    default:
      throw new Error('Unknown rank by option.')
  }
};

export { startTimestampFromRankBy };