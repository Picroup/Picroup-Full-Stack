import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import {FOLLOW_USER, reputationValue} from "../../../../server/usecases/model/ReputationKind";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink/index";

let mongoService;
let followUser;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  followUser = mutationResolver.followUser;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation followUser', () => {

  it('should test follow user basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);

    // inject dependency

    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123' },
      {_id: toUserId, username: 'li', password: '321' },
    ]);

    // perform operation

    await followUser({}, {userId: userIdKey, toUserId: toUserIdKey});

    // check result

    const user = await User.findById(userId);
    const toUser = await User.findById(toUserId);
    const link = await FollowUserLink.findOne({userId, toUserId});

    expect(user).toMatchObject({
      _id: userId,
      username: 'luojie',
      followingsCount: 1,
      followersCount: 0,
      reputation: 0
    });

    expect(toUser).toMatchObject({
      _id: toUserId,
      username: 'li',
      followingsCount: 0,
      followersCount: 1,
      reputation: reputationValue(FOLLOW_USER)
    });

    expect(link).toMatchObject({
      userId,
      toUserId,
      unique: '5ab992fe05b6e9bf4c253b53_5abb34e67f9f4cf1429de9b0'
    })
  })
});