import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink/index";
import Notification from "../../../../server/usecases/mongoose/Notification/index";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";

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

  describe('basic', async () => {

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
      await FollowUserLink.remove({});
      await ReputationLink.remove({});
      await Notification.remove({});
    });

    it('should test user', async () => {

      await followUser({}, {userId: userIdKey, toUserId: toUserIdKey});
      const user = await User.findById(userId);

      expect(user).toMatchObject({
        _id: userId,
        username: 'luojie',
        followingsCount: 1,
        followersCount: 0,
        notificationsCount: 0,
        reputation: 5
      });

    });

    it('should test toUser', async () => {

      await followUser({}, {userId: userIdKey, toUserId: toUserIdKey});
      const toUser = await User.findById(toUserId);

      expect(toUser).toMatchObject({
        _id: toUserId,
        username: 'li',
        followingsCount: 0,
        followersCount: 1,
        notificationsCount: 1,
        reputation: 10 + ReputationKind.reputationValue(ReputationKind.followUser),
        gainedReputation: ReputationKind.reputationValue(ReputationKind.followUser)
      });

    });

    it('should test link', async () => {

      await followUser({}, {userId: userIdKey, toUserId: toUserIdKey});
      const link = await FollowUserLink.findOne({userId, toUserId});

      expect(link).toMatchObject({
        userId,
        toUserId,
      });

    });

    it('should test notification', async () => {

      await followUser({}, {userId: userIdKey, toUserId: toUserIdKey});
      const notification = await Notification.findOne({userId, toUserId, kind: NotificationKind.followUser});

      expect(notification).toMatchObject({
        userId,
        toUserId,
        kind: NotificationKind.followUser,
        content: undefined,
        viewed: false
      });

    });

  });

});