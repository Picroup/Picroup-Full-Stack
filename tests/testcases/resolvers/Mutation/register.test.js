import '../../../usecases/dependency';
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from './mutationResolver';
import User from "../../../../server/usecases/mongoose/User/index";
import {createSaltedPassword} from "../../../../server/usecases/crypto/index";

let mongoService;
let register;

const clearData = async () => await User.remove({});

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  register = mutationResolver.register;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver Mutation register', () => {

  it('should test register basic', async () => {

    await register({}, {username: 'luojie', password: '123'});

    const user = await User.findOne({
      username: 'luojie',
      password: createSaltedPassword('123')
    });

    expect(user).toMatchObject({
      username: 'luojie',
      password: createSaltedPassword('123')
    });

    await clearData();
  });

  it('should test register not found', async () => {

    await register({}, {username: 'luojie', password: '123'});

    const user = await User.findOne({
      username: 'luojie',
      password: createSaltedPassword('12')
    });

    expect(user).toBeNull();

    await clearData();
  });

});