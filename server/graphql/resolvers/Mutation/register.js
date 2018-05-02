import {createSaltedPassword} from "../../../usecases/crypto";

export const register = ({dependency: {
  User,
  }}) => async (_, args) => {
  args.password = createSaltedPassword(args.password);
  return await User.create(args);
};