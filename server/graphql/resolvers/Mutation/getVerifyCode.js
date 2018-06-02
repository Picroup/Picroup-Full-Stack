// import {sendVerifyCode} from "../../../usecases/sns";
import {getCurrentTimestamp, oneMinute} from "../../../libraries/date";
import {sendVerifyCode} from "../../../usecases/sms";

export const createGetVerifyCodeResolver = ({dependency: {
  VerifyCode,
}}) => async (_, {phoneNumber}) => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const expiredAt = getCurrentTimestamp() + 5 * oneMinute;
  await VerifyCode.findOneAndUpdate({phoneNumber}, {$set: {code,expiredAt}}, {new: true, upsert: true});
  await sendVerifyCode({phoneNumber, code});
  return phoneNumber;
};