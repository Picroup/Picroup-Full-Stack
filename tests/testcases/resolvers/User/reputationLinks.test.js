import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import userResolver from "./userResolver";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";
import {ObjectId} from "../../../../server/libraries/mongoose";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import {expectContains} from "../../../libaries/jest";

let mongoService;
let reputationLinks;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  reputationLinks = userResolver.reputationLinks;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver User reputationLinks', () => {

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);
  const mediumId = new ObjectId(mediumIdKey);

  beforeEach(async () => {
    await ReputationLink.insertMany([
      {userId, toUserId: userId, mediumId, createdAt: 1, unique: '1', kind: ReputationKind.saveMedium, value: ReputationKind.reputationValue(ReputationKind.saveMedium)},
      {userId, toUserId, mediumId, createdAt: 2, unique: '2', kind: ReputationKind.starMedium, value: ReputationKind.reputationValue(ReputationKind.starMedium)},
      {userId, toUserId, createdAt: 3, unique: '3', kind: ReputationKind.followUser, value: ReputationKind.reputationValue(ReputationKind.followUser)},
      {userId: toUserId, createdAt: 4, unique: '4', toUserId: userId, kind: NotificationKind.followUser, value: ReputationKind.reputationValue(ReputationKind.followUser)},
    ]);
  });

  afterEach(async () => {
    await ReputationLink.remove({});
  });

  it('should test basic', async () => {

    const cursorReputationLinks = await reputationLinks({_id: toUserId}, {cursor: null});

    expect(cursorReputationLinks.cursor).toEqual(null);
    expect(cursorReputationLinks.items).toEqual(expectContains([
      {userId, toUserId, createdAt: 3, unique: '3', kind: ReputationKind.followUser, value: ReputationKind.reputationValue(ReputationKind.followUser)},
      {userId, toUserId, mediumId, createdAt: 2, unique: '2', kind: ReputationKind.starMedium, value: ReputationKind.reputationValue(ReputationKind.starMedium)},
    ]));
  });

});