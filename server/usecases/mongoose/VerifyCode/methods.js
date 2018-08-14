/**
 * Created by Air on 2018/8/14.
 */

import schema from './schema';
import VerifyCode from "./index";
import {getCurrentTimestamp} from "../../../libraries/date/index";

schema.statics.exist = async ({phoneNumber, code}) => {
  const now = getCurrentTimestamp();
  return await VerifyCode.findOne({phoneNumber, code, expiredAt: { $gt: now }});
};

export default schema;
