import User from "../usecase/mongoose/User";
import {createSaltedPassword} from "../usecase/crypto";
import {loginUserNotFoundError} from "./errors";
import Medium from "../usecase/mongoose/Medium";

export default {
  Query: {
    login: async (_, args) => {
      args.password = createSaltedPassword(args.password);
      const user = await User.findOne(args);
      if (!user) { throw loginUserNotFoundError() }
      return user;
    }
  },
  Mutation: {
    register: async (_, args) => {
      args.password = createSaltedPassword(args.password);
      const user = new User(args);
      return await user.save();
    },
    saveImageMedium: async (obj, { userId, minioId, width, aspectRatio }, context, info) => {
      const medium = new Medium({
        userId,
        minioId,
        kind: 'image',
        detail: { width, aspectRatio }
      });
      return await medium.save();
    }
  }
};