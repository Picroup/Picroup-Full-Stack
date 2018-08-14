import {setById} from "../../../libraries/mongoose";
import {createSaltedPassword} from "../../../usecases/crypto";


export const createSetPasswordResolver = ({dependency: {
  User
}}) => async ({_id}, { password, oldPassword }) => {
  password = createSaltedPassword(password);
  oldPassword = createSaltedPassword(oldPassword);
  const user = await User.findById(_id);
  if (user.password !== oldPassword) throw new Error('旧密码不匹配！');
  return await setById({ Model: User, _id, value: { password } })
};