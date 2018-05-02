import {createSaltedPassword} from "../../../usecases/crypto";

export const createRegisterResolver = ({dependency: {
  User,
  }}) => async (_, args) => {
  args.password = createSaltedPassword(args.password);
  return await User.create(args);
};