import {getCurrentTimestamp} from "../../libraries/date";

const oneDay = 24 * 3600;
const oneWeek = 7 * oneDay;
const maybeOneMonth = 30 * oneDay;

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