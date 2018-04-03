import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from './mutationResolver';
import User from "../../../../server/usecases/mongoose/User/index";
import {createSaltedPassword} from "../../../../server/usecases/crypto/index";

let mongoService;
let register;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  register = mutationResolver.register;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver Mutation register', () => {

  describe('basic', async () => {

    afterEach(async () => await User.remove({}));

    it('should test success', async () => {

      await register({}, {username: 'luojie', password: '123'});

      const user = await User.findOne({
        username: 'luojie',
        password: createSaltedPassword('123')
      });

      expect(user).toMatchObject({
        username: 'luojie',
        password: createSaltedPassword('123')
      });

    });

    it('should test not found', async () => {

      await register({}, {username: 'luojie', password: '123'});

      const user = await User.findOne({
        username: 'luojie',
        password: createSaltedPassword('12')
      });

      expect(user).toBeNull();

    });

  });

});