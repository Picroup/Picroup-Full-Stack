import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink/index";

let mongoService;
let unfollowUser;

const clearData = async () => {
  await User.remove({});
  await FollowUserLink.remove({});
};

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  unfollowUser = mutationResolver.unfollowUser;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation unfollowUser', () => {

  it('should test unfollowUser basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);

    // initial state
    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123', followingsCount: 2, followersCount: 2, reputation: 10},
      {_id: toUserId, username: 'li', password: '321', followingsCount: 2, followersCount: 2, reputation: 10},
    ]);
    await FollowUserLink.create({ userId, toUserId, unique: `${userId}_${toUserId}` });

    // perform operation
    await unfollowUser({}, {userId, toUserId});

    // check result
    const user = await User.findById(userId);
    const toUser = await User.findById(toUserId);
    const linkCount = await FollowUserLink.count({userId, toUserId});

    expect(user).toMatchObject({
      _id: userId,
      username: 'luojie',
      followingsCount: 1,
      followersCount: 2,
      reputation: 10
    });

    expect(toUser).toMatchObject({
      _id: toUserId,
      username: 'li',
      followingsCount: 2,
      followersCount: 1,
      reputation: 10
    });

    expect(linkCount).toEqual(0);

    await clearData();
  })
});
