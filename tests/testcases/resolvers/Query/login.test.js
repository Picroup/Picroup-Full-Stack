import '../../../usecases/dependency';
import User from "../../../../server/usecases/mongoose/User";
import {createSaltedPassword} from "../../../../server/usecases/crypto/index";
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import queryResolver from './queryResolver';

let mongoTestService;
let login;

const importData = async () => {
  await User.create({ username: 'luojie', password: createSaltedPassword('123'), phoneNumber: "0" });
};

const clearData = async () => {
  await User.remove({});
};

beforeAll(async () => {
  mongoTestService = new MongoTestService({onStart: importData, onStop: clearData});
  await mongoTestService.start();
  login = queryResolver.login;
});

afterAll(async () => {
  mongoTestService.stop()
});

describe("Resolver Query login", () => {

  it('should test login basic', async () => {
    const user = await login({}, {username: 'luojie', password: '123'});
    expect(user).toMatchObject({
      username: 'luojie',
      password: createSaltedPassword('123'),
      reputation: 0,
      followingsCount: 0,
      followersCount: 0,
    });
  });

  it('should test login not exist', async () => {
    const user = await login({}, {username: 'luojie', password: '1234'});
    expect(user).toBeNull();
  });
});