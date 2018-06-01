import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from './mutationResolver';
import User from "../../../../server/usecases/mongoose/User/index";
import {createSaltedPassword} from "../../../../server/usecases/crypto/index";
import Medium from "../../../../server/usecases/mongoose/Medium";
import VerifyCode from "../../../../server/usecases/mongoose/VerifyCode";
import {ObjectId} from "../../../../server/libraries/mongoose";
import {getCurrentTimestamp, oneMinute} from "../../../../server/libraries/date";

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

  const verifyCodeId = new ObjectId('5b1010845972297990b5b324');
  const phoneNumber = "+8615342299921";
  const code = 367951;

  beforeEach(async () => {
    const expiredAt = getCurrentTimestamp() + 5 * oneMinute;
    await VerifyCode.create(
      { _id: verifyCodeId, phoneNumber, code, expiredAt }
    );
  });

  afterEach(async () => {
    await User.remove({});
    await VerifyCode.remove({});
  });

  describe('basic', async () => {

    afterEach(async () => await User.remove({}));

    it('should test success', async () => {

      await register({}, {username: 'luojie', password: '123', phoneNumber, code});

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

      await register({}, {username: 'luojie', password: '123', phoneNumber, code});

      const user = await User.findOne({
        username: 'luojie',
        password: createSaltedPassword('12')
      });

      expect(user).toBeNull();

    });

  });

});