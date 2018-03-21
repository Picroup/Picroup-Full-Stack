import User from "../usecase/mongoose/User";
import {createSaltedPassword} from "../usecase/crypto";

export default {
  Query: {
    login: async (_, { userInput }) => {
      userInput.password = createSaltedPassword(userInput.password);
      const user = await User.findOne(userInput);
      if (!user) { throw new Error('用户名或密码错误') }
      return user;
    }
  },
  Mutation: {
    register: async (_, { userInput }) => {
      userInput.password = createSaltedPassword(userInput.password);
      const user = new User(userInput);
      const savedUser = await user.save();
      return savedUser;
    }
  }
};