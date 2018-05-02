import {createSaltedPassword} from "../../../usecases/crypto";

export const createLoginResolver = ({dependency: {
  User
  }}) => async (_, args) => {
  args.password = createSaltedPassword(args.password);
  return await User.findOne(args);
};