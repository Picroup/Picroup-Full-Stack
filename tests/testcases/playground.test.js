import MongoTestService from "../usecases/mongdbserver/MongoTestService";
import {ObjectId} from "../../server/libraries/mongoose/index";
import User from "../../server/usecases/mongoose/User";
import {getCurrentTimestamp, oneMinute} from "../../server/libraries/date";
import VerifyCode from "../../server/usecases/mongoose/VerifyCode";

let mongoService;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver User notifications', () => {

  // const userIdKey = '5ab992fe05b6e9bf4c253b53';
  // const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  // const userId = new ObjectId(userIdKey);
  // const toUserId = new ObjectId(toUserIdKey);

  beforeEach(async () => {
    // await User.insertMany([
    //   {_id: userId, username: 'luojie', password: '123', reputation: 5 },
    //   {_id: toUserId, username: 'li', password: '321', reputation: 10 },
    // ]);
  });

  afterEach(async () => {
    // await User.remove({});
  });

  it('should test basic', async () => {

    const phoneNumber = "+8615342299921";
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiredAt = getCurrentTimestamp() + 5 * oneMinute;

    const result = await VerifyCode.findOneAndUpdate(
      {phoneNumber},
      {$set: {code,expiredAt}},
      {new: true, upsert: true}
    );

    console.log('result', result);
  });
});