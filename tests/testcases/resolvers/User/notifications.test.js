import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import userResolver from "./userResolver";
import Notification from "../../../../server/usecases/mongoose/Notification";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";
import {expectContains} from "../../../libaries/jest";
import {ObjectId} from "../../../../server/libraries/mongoose/index";

let mongoService;
let notifications;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  notifications = userResolver.notifications;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver User notifications', () => {

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);
  const mediumId = new ObjectId(mediumIdKey);

  beforeEach(async () => {

    await Notification.insertMany([
      {userId, toUserId, mediumId, content: `That's great!`, kind: NotificationKind.commentMedium, createdAt: 1},
      {userId, toUserId, mediumId, kind: NotificationKind.starMedium, createdAt: 2},
      {userId, toUserId, kind: NotificationKind.followUser, createdAt: 3},
      {userId: toUserId, toUserId: userId, kind: NotificationKind.followUser, createdAt: 4},
    ]);

  });

  afterEach(async () => {
    await Notification.remove({});
  });

  it('should test basic', async () => {

    const cursorNotifications = await notifications({_id: toUserId}, {cursor: null});

    expect(cursorNotifications.cursor).toEqual(null);
    expect(cursorNotifications.items).toEqual(expectContains([
      {userId, toUserId, kind: NotificationKind.followUser, createdAt: 3},
      {userId, toUserId, mediumId, kind: NotificationKind.starMedium, createdAt: 2},
      {userId, toUserId, mediumId, content: `That's great!`, kind: NotificationKind.commentMedium, createdAt: 1},
    ]));
  });

});