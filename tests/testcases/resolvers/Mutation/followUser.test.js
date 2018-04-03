import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink/index";
import Notification from "../../../../server/usecases/mongoose/Notification/index";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";

let mongoService;
let followUser;

const clearData = async () => {
  await User.remove({});
  await FollowUserLink.remove({});
};

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  followUser = mutationResolver.followUser;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation followUser', () => {

  it('should test followUser basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);

    // initial state
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
    const notification = await Notification.findOne({userId, toUserId, kind: NotificationKind.followUser});

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
      reputation: ReputationKind.reputationValue(ReputationKind.followUser)
    });

    expect(link).toMatchObject({
      userId,
      toUserId,
    });

    expect(notification).toMatchObject({
      userId,
      toUserId,
      kind: NotificationKind.followUser,
      content: undefined,
      viewed: false
    });

    await clearData();
  })
});