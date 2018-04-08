import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink/index";

let mongoService;
let unfollowUser;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  unfollowUser = mutationResolver.unfollowUser;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation unfollowUser', () => {

  describe('basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);

    beforeEach(async () => {
      await User.insertMany([
        {_id: userId, username: 'luojie', password: '123', followingsCount: 2, followersCount: 2, reputation: 10},
        {_id: toUserId, username: 'li', password: '321', followingsCount: 2, followersCount: 2, reputation: 10},
      ]);
      await FollowUserLink.create({ userId, toUserId, unique: `${userId}_${toUserId}` });
    });

    afterEach(async () => {
      await User.remove({});
      await FollowUserLink.remove({});
    });

    it('should test user', async () => {
      await unfollowUser({}, {userId, toUserId});
      const user = await User.findById(userId);

      expect(user).toMatchObject({
        _id: userId,
        username: 'luojie',
        followingsCount: 1,
        followersCount: 2,
        reputation: 10
      });

    });

    it('should test toUser', async () => {
      await unfollowUser({}, {userId, toUserId});
      const toUser = await User.findById(toUserId);

      expect(toUser).toMatchObject({
        _id: toUserId,
        username: 'li',
        followingsCount: 2,
        followersCount: 1,
        reputation: 10
      });

    });

    it('should test linkCount', async () => {
      await unfollowUser({}, {userId, toUserId});
      const linkCount = await FollowUserLink.count({userId, toUserId});

      expect(linkCount).toEqual(0);

    });

  });
});
