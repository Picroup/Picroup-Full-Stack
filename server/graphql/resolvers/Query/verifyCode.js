/**
 * Created by Air on 2018/8/14.
 */

import {createVerifyPhoneToken} from "../../../usecases/jsonwebtoken/index";

export const createVerifyCodeResolver = ({dependency: {
  User,
  VerifyCode,
}}) => async (_, {phoneNumber, code}) => {
  const exist = VerifyCode.exist({phoneNumber, code});
  if (!exist) { throw new Error('验证码无效。'); }
  return createVerifyPhoneToken({phoneNumber});
};