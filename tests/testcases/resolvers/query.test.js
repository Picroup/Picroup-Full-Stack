import '../../usecases/dependency/index';
import mongoose from 'mongoose'
import User from "../../../server/usecases/mongoose/User";
import Medium from "../../../server/usecases/mongoose/Medium";
import {connectMongoServer, createMongoServer} from "../../usecases/mongdbserver";
import {createQueryResolver} from "../../../server/graphql/resolvers/Query";
import {createSaltedPassword} from "../../../server/usecases/crypto/index";

let mongoServer;
let login;

const importData = async () => {
  await User.create({ username: 'luojie', password: createSaltedPassword('123') });
};

const clearData = async () => {
  await User.remove({});
};

beforeAll(async () => {

  mongoServer = createMongoServer();
  await connectMongoServer(mongoose, mongoServer);

  login = createQueryResolver({dependency: {
      User,
      Medium,
  }}).login;

  await importData();
});

afterAll(async () => {
  await clearData();
  await mongoose.disconnect();
  mongoServer.stop()
});

describe("Resolver Query", () => {

  it('should test resolver query login basic', async () => {
    const user = await login({}, {username: 'luojie', password: '123'});
    expect(user).toMatchObject({
      username: 'luojie',
      password: createSaltedPassword('123'),
      reputation: 0,
      followingsCount: 0,
      followersCount: 0,
    });
  });

  it('should test resolver query login not exist', async () => {
    const user = await login({}, {username: 'luojie', password: '1234'});
    expect(user).toBeNull();
  });


});