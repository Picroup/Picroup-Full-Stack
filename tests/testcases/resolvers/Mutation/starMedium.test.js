
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import User from "../../../../server/usecases/mongoose/User/index";
import Medium from "../../../../server/usecases/mongoose/Medium/index";
import StarMediumLink from "../../../../server/usecases/mongoose/StarMediumLink/index";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink/index";
import Notification from "../../../../server/usecases/mongoose/Notification/index";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import {oneWeek} from "../../../../server/libraries/date/index";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";

let mongoService;
let starMedium;

const clearData = async () => {
  await User.remove({});
  await Medium.remove({});
  await StarMediumLink.remove({});
  await ReputationLink.remove({});
};

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  starMedium = mutationResolver.starMedium;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver Mutation starMedium', () => {

  it('should test starMedium basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);
    const mediumId = new ObjectId(mediumIdKey);
    const endedAt = 0;

    // initial state
    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123'},
      {_id: toUserId, username: 'li', password: '123'},
    ]);

    await Medium.create(
      { _id: mediumId, userId: toUserId, minioId: 'minioId0', category : 'beauty', kind : 'image', endedAt }
    );

    // perform operation
    await starMedium({}, {userId, mediumId});

    // check result
    const medium = await Medium.findById(mediumId);
    const user = await User.findById(userId);
    const toUser = await User.findById(toUserId);
    const starMediumLink = await StarMediumLink.findOne({userId, mediumId});
    const reputationLink = await ReputationLink.findStarMediumLink({userId, mediumId});
    const notification = await Notification.findOne({userId, mediumId, kind: NotificationKind.starMedium});

    expect(medium).toMatchObject({
      _id: mediumId,
      userId: toUserId,
      minioId: 'minioId0',
      category : 'beauty',
      kind : 'image',
      endedAt: oneWeek
    });

    expect(user).toMatchObject({
      _id: userId,
      username: 'luojie',
      followingsCount: 0,
      followersCount: 0,
      reputation: 0,
    });

    expect(toUser).toMatchObject({
      _id: toUserId,
      username: 'li',
      followingsCount: 0,
      followersCount: 0,
      reputation: ReputationKind.reputationValue(ReputationKind.starMedium),
    });

    expect(starMediumLink).toMatchObject({
      userId,
      mediumId,
    });

    expect(reputationLink).toMatchObject({
      userId,
      mediumId,
      toUserId,
      kind: ReputationKind.starMedium,
    });

    expect(notification).toMatchObject({
      userId,
      toUserId,
      mediumId,
      kind: NotificationKind.starMedium,
      content: undefined,
      viewed: false
    });

    await clearData();
  });

});