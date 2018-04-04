import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import userResolver from "./userResolver";
import User from "../../../../server/usecases/mongoose/User";
import Notification from "../../../../server/usecases/mongoose/Notification";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import {expectContains} from "../../../libaries/jest";

let mongoService;
let markNotificationsAsViewed;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  markNotificationsAsViewed = userResolver.markNotificationsAsViewed;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver User markNotificationsAsViewed', () => {

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);
  const mediumId = new ObjectId(mediumIdKey);

  beforeEach(async () => {
    await User.create(
      {_id: toUserId, username: 'luojie', password: '123', notificationsCount: 3 }
    );
    await Notification.insertMany([
      { userId, toUserId, kind: NotificationKind.followUser, createdAt: 0 },
      { userId, toUserId, mediumId, kind: NotificationKind.starMedium, createdAt: 1  },
      { userId, toUserId, mediumId, content: '123', kind: NotificationKind.commentMedium, createdAt: 2  },
      { userId: toUserId, toUserId: userId, kind: NotificationKind.followUser, createdAt: 3  },
    ])
  });

  afterEach(async () => {
    await User.remove({});
    await Notification.remove({});
  });

  it('should test user', async () => {
    const user = await markNotificationsAsViewed({_id: toUserId});

    expect(user).toMatchObject({
      _id: toUserId,
      username: 'luojie',
      followingsCount: 0,
      followersCount: 0,
      notificationsCount: 0,
      reputation: 0
    })
  });

  it('should test notifications', async () => {
    await markNotificationsAsViewed({_id: toUserId});
    const notifications = await Notification.find().sort({createdAt: 1});

    expect(notifications).toEqual(expectContains([
      { userId, toUserId, viewed: true, kind: NotificationKind.followUser, createdAt: 0 },
      { userId, toUserId, viewed: true, mediumId, kind: NotificationKind.starMedium, createdAt: 1  },
      { userId, toUserId, viewed: true, mediumId, content: '123', kind: NotificationKind.commentMedium, createdAt: 2  },
      { userId: toUserId, toUserId: userId, viewed: false, kind: NotificationKind.followUser, createdAt: 3  },
    ]))
  });

});