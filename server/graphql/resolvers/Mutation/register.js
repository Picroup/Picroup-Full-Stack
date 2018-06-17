import {createSaltedPassword} from "../../../usecases/crypto";
import {getCurrentTimestamp} from "../../../libraries/date";

export const createRegisterResolver = ({dependency: {
  User,
  VerifyCode,
  }}) => async (_, {username, password, phoneNumber, code}) => {
  const now = getCurrentTimestamp();
  const exist = await VerifyCode.findOne({phoneNumber, code, expiredAt: { $gt: now }});
  if (!exist) { throw new Error('验证码无效。'); }
  password = createSaltedPassword(password);
  return await User.create({username, password, phoneNumber});
};