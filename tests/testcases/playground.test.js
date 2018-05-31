import MongoTestService from "../usecases/mongdbserver/MongoTestService";
import {ObjectId} from "../../server/libraries/mongoose/index";
import User from "../../server/usecases/mongoose/User";

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
      {_id: userId, username: 'luojie', password: '123', reputation: 5 },
      {_id: toUserId, username: 'li', password: '321', reputation: 10 },
    ]);
  });

  afterEach(async () => {
    await User.remove({});
  });

  it('should test basic', async () => {

    const users = await User.find();

    console.log(users)
  });
});