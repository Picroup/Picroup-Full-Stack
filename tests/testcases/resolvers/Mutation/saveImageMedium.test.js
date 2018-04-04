import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import User from "../../../../server/usecases/mongoose/User/index";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink/index";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import Medium from "../../../../server/usecases/mongoose/Medium/index";

let mongoService;
let saveImageMedium;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  saveImageMedium = mutationResolver.saveImageMedium;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation saveImageMedium', () => {

  describe('basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const userId = new ObjectId(userIdKey);
    const minioId = 'minioId0';
    const width = '300';
    const aspectRatio = '2.5';
    const category = 'popular';

    beforeEach(async () => {
      await User.create(
        { _id: userId, username: 'luojie', password: '123', reputation: 5, }
      );
    });

    afterEach(async () => {
      await User.remove({});
      await Medium.remove({});
      await ReputationLink.remove({});
    });

    it('should test medium', async () => {

      const savedMedium = await saveImageMedium({}, { userId: userIdKey, minioId, width, aspectRatio, category });
      const medium = await Medium.findById(savedMedium._id);

      expect(medium).toMatchObject({
        userId,
        minioId,
        category,
        kind: 'image',
        detail: { width, aspectRatio }
      });

    });

    it('should test link', async () => {

      const savedMedium = await saveImageMedium({}, { userId: userIdKey, minioId, width, aspectRatio, category });
      const mediumId = savedMedium._id;
      const link = await ReputationLink.findSaveMediumLink(mediumId);

      expect(link).toMatchObject({
        userId,
        mediumId,
        toUserId: userId,
        kind: ReputationKind.saveMedium,
        unique: `${ReputationKind.saveMedium}_${mediumId}`
      });

    });

    it('should test user', async () => {

      await saveImageMedium({}, { userId: userIdKey, minioId, width, aspectRatio, category });
      const user = await User.findById(userId);

      expect(user).toMatchObject({
        _id: userId,
        username: 'luojie',
        reputation: 5 + ReputationKind.reputationValue(ReputationKind.saveMedium),
        gainedReputation: ReputationKind.reputationValue(ReputationKind.saveMedium),
      });

    });

  });

});