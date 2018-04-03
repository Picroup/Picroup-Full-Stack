import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import User from "../../../../server/usecases/mongoose/User/index";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink/index";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import ReputationKind from "../../../../server/usecases/model/ReputationKind";
import Medium from "../../../../server/usecases/mongoose/Medium/index";

let mongoService;
let saveImageMedium;

const clearData = async () => {
  await User.remove({});
  await Medium.remove({});
  await ReputationLink.remove({});
};

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  saveImageMedium = mutationResolver.saveImageMedium;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation saveImageMedium', () => {

  it('should test saveImageMedium basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const userId = new ObjectId(userIdKey);
    const minioId = 'minioId0';
    const width = '300';
    const aspectRatio = '2.5';
    const category = 'popular';

    // initial state
    await User.create(
      { _id: userId, username: 'luojie', password: '123', }
    );

    // perform operation
    const savedMedium = await saveImageMedium({}, { userId: userIdKey, minioId, width, aspectRatio, category });

    // check result
    const mediumId = savedMedium._id;
    const medium = await Medium.findById(mediumId);
    const link = await ReputationLink.findSaveMediumLink(mediumId);
    const user = await User.findById(userId);

    expect(medium).toMatchObject({
      userId,
      minioId,
      category,
      kind: 'image',
      detail: { width, aspectRatio }
    });

    expect(link).toMatchObject({
      userId,
      mediumId,
      toUserId: userId,
      kind: ReputationKind.saveMedium,
      unique: `${ReputationKind.saveMedium}_${mediumId}`
    });

    expect(user).toMatchObject({
      _id: userId,
      username: 'luojie',
      reputation: ReputationKind.reputationValue(ReputationKind.saveMedium),
    });

    await clearData()
  });

});