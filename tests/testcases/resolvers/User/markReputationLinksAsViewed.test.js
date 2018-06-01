import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import userResolver from "./userResolver";
import {ObjectId} from "../../../../server/libraries/mongoose";
import User from "../../../../server/usecases/mongoose/User";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import {expectContains} from "../../../libaries/jest";

let mongoService;
let markReputationLinksAsViewed;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  markReputationLinksAsViewed = userResolver.markReputationLinksAsViewed;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver User markReputationLinksAsViewed', () => {

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);
  const mediumId = new ObjectId(mediumIdKey);

  beforeEach(async () => {
    await User.create(
      {_id: toUserId, username: 'luojie', password: '123', phoneNumber: "0", gainedReputation: 70 }
    );
    await ReputationLink.insertMany([
      { userId,           mediumId, toUserId,         kind: ReputationKind.starMedium, unique: '0', value: 10, createdAt: 0 },
      { userId: toUserId, mediumId, toUserId,         kind: ReputationKind.saveMedium, unique: '1', value: 10, createdAt: 1 },
      { userId,                     toUserId,         kind: ReputationKind.followUser, unique: '2', value: 50, createdAt: 2 },
      { userId: toUserId, mediumId, toUserId: userId, kind: ReputationKind.starMedium, unique: '3', value: 20, createdAt: 3 },
    ])
  });

  afterEach(async () => {
    await User.remove({});
    await ReputationLink.remove({});
  });

  it('should test user', async () => {

    const user = await markReputationLinksAsViewed({_id:toUserId});

    expect(user).toMatchObject({
      _id: toUserId,
      username: 'luojie',
      gainedReputation: 0,
    })
  });

  it('should test reputationLinks', async () => {

    await markReputationLinksAsViewed({_id:toUserId});
    const reputationLinks = await ReputationLink.find({}).sort({createdAt: 1});

    expect(reputationLinks).toEqual(expectContains([
      { userId,           mediumId, toUserId,         viewed: true,  kind: ReputationKind.starMedium, unique: '0', value: 10, createdAt: 0 },
      { userId: toUserId, mediumId, toUserId,         viewed: true,  kind: ReputationKind.saveMedium, unique: '1', value: 10, createdAt: 1 },
      { userId,                     toUserId,         viewed: true,  kind: ReputationKind.followUser, unique: '2', value: 50, createdAt: 2 },
      { userId: toUserId, mediumId, toUserId: userId, viewed: false, kind: ReputationKind.starMedium, unique: '3', value: 20, createdAt: 3 },
    ]))
  });

});
