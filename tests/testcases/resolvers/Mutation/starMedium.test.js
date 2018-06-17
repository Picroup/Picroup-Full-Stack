
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

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  starMedium = mutationResolver.starMedium;
});

afterAll(async () => {
  await mongoService.stop();
});

describe('Resolver Mutation starMedium', () => {

  describe('basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);
    const mediumId = new ObjectId(mediumIdKey);
    const endedAt = 0;

    beforeEach(async () => {
      await User.insertMany([
        {_id: userId, username: 'luojie', password: '123', phoneNumber: "0", reputation: 5 },
        {_id: toUserId, username: 'li', password: '123', phoneNumber: "01", reputation: 10 },
      ]);

      await Medium.create(
        { _id: mediumId, userId: toUserId, minioId: 'minioId0', kind : 'image', endedAt }
      );
    });

    afterEach(async () => {
      await User.remove({});
      await Medium.remove({});
      await StarMediumLink.remove({});
      await ReputationLink.remove({});
    });

    it('should test medium', async () => {

      await starMedium({}, {userId, mediumId});
      const medium = await Medium.findById(mediumId);

      expect(medium).toMatchObject({
        _id: mediumId,
        userId: toUserId,
        minioId: 'minioId0',
        kind : 'image',
        endedAt: endedAt + oneWeek
      });

    });

    it('should test user', async () => {

      await starMedium({}, {userId, mediumId});
      const user = await User.findById(userId);

      expect(user).toMatchObject({
        _id: userId,
        username: 'luojie',
        followingsCount: 0,
        followersCount: 0,
        reputation: 5,
        gainedReputation: 0,
      });

    });

    it('should test toUser', async () => {

      await starMedium({}, {userId, mediumId});
      const toUser = await User.findById(toUserId);

      expect(toUser).toMatchObject({
        _id: toUserId,
        username: 'li',
        followingsCount: 0,
        followersCount: 0,
        reputation: 10 + ReputationKind.reputationValue(ReputationKind.starMedium),
        gainedReputation: ReputationKind.reputationValue(ReputationKind.starMedium),
      });

    });

    it('should test starMediumLink', async () => {

      await starMedium({}, {userId, mediumId});
      const starMediumLink = await StarMediumLink.findOne({userId, mediumId});

      expect(starMediumLink).toMatchObject({
        userId,
        mediumId,
      });

    });

    it('should test reputationLink', async () => {

      await starMedium({}, {userId, mediumId});
      const reputationLink = await ReputationLink.findStarMediumLink({userId, mediumId});

      expect(reputationLink).toMatchObject({
        userId,
        mediumId,
        toUserId,
        kind: ReputationKind.starMedium,
      });

    });

    it('should test notification', async () => {

      await starMedium({}, {userId, mediumId});
      const notification = await Notification.findOne({userId, mediumId, kind: NotificationKind.starMedium});

      expect(notification).toMatchObject({
        userId,
        toUserId,
        mediumId,
        kind: NotificationKind.starMedium,
        content: undefined,
        viewed: false
      });

    });

  });

});