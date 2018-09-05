/**
 * Created by Air on 2018/8/14.
 */


import {verifyPhoneToken} from "../../../usecases/jsonwebtoken/index";
import {createSaltedPassword} from "../../../usecases/crypto/index";
export const createResetPasswordResolver = ({dependency: {
  User,
}}) => async (_, {phoneNumber, password, token}) => {
  const {phoneNumber: phone} = verifyPhoneToken({token});
  if (phone !== phoneNumber) { throw new Error('验证失败')}
  password = createSaltedPassword(password);
  const { username } = await User.findOneAndUpdate({phoneNumber}, {$set: {password}}, {new: true});
  return username;
};