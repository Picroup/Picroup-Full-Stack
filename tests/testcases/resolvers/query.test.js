import '../../usecases/dependency/index';
import mongoose from 'mongoose'
import User from "../../../server/usecases/mongoose/User";
import Medium from "../../../server/usecases/mongoose/Medium";
import {connectMongoServer, createMongoServer} from "../../usecases/mongdbserver";
import {createQueryResolver} from "../../../server/graphql/resolvers/Query";

let mongoServer;
let login;

beforeAll(async () => {

  mongoServer = createMongoServer();
  await connectMongoServer(mongoose, mongoServer);

  login = createQueryResolver({dependency: {
      User,
      Medium,
  }}).login;

  await User.create({ username: 'luojie', password: '6fc5175c4d1a0834ec6f77898e481e734ac77da45ae9ac91c0e100d853eb672d' });
});

afterAll(async () => {
  await mongoose.disconnect();
  mongoServer.stop()
});

describe("Resolver Query", () => {

  it('should test resolver query login', async () => {

    const user = await login({}, {username: 'luojie', password: '123'});

    console.log('user', user);

    // expect(cursorModels.cursor).toEqual(null);
    // expect(cursorModels.items).toEqual(expectContains([
    //   { createdAt: 0 },
    //   { createdAt: 1 },
    //   { createdAt: 2 },
    // ]));

  });

});