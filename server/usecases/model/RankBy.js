import {getCurrentTimestamp} from "../../libraries/date";
import {maybeOneMonth, oneDay, oneWeek} from "../../libraries/date/index";

export default class RankBy {
  static today = 'today';
  static thisWeek = 'thisWeek';
  static thisMonth = 'thisMonth';

  static startTimestamp = (kind) => {
    switch (kind) {
      case RankBy.today:
        return getCurrentTimestamp() - oneDay;
      case RankBy.thisWeek:
        return getCurrentTimestamp() - oneWeek;
      case RankBy.thisMonth:
        return getCurrentTimestamp() - maybeOneMonth;
      default:
        throw new Error('Unknown rank by option.')
    }
  }
}
