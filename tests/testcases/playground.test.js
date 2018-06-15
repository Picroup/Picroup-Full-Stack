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

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);

  beforeEach(async () => {
    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123', phoneNumber: 5, reputation: 5 },
      {_id: toUserId, username: 'li', password: '321', phoneNumber: 5, reputation: 10 },
      {_id: '5abb34e67f924cf1429de9b0', username: 'lei', phoneNumber: 5, password: '321', reputation: 15 },
      {_id: '5abb34e67f944cf1429de9b0', username: 'lir', phoneNumber: 5, password: '321', reputation: 20 },
    ]);
  });

  afterEach(async () => {
    await User.remove({});
  });

  it('should test basic', async () => {

    const  result = await User.findByIdAndDelete('5abb34e67f944cf1429de9b0');

    console.log('result', result);

    // const ids = [0, 1, 2, 3];
    // for (const id of ids) console.log({id});

  });
});