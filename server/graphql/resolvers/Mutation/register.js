import {createSaltedPassword} from "../../../usecases/crypto";

export const createRegisterResolver = ({dependency: {
  User,
  VerifyCode,
  }}) => async (_, {username, password, phoneNumber, code}) => {
  const exist = VerifyCode.exist({phoneNumber, code});
  if (!exist) { throw new Error('验证码无效。'); }
  password = createSaltedPassword(password);
  return await User.create({username, password, phoneNumber});
};