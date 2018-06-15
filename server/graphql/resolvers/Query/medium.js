import {getCurrentTimestamp} from "../../../libraries/date";


export const createMediumResolver = ({dependency: {
  Medium
  }}) => async (_, { mediumId }) =>
  await Medium.findOne({ _id: mediumId, endedAt: {$gt: getCurrentTimestamp()}})
;