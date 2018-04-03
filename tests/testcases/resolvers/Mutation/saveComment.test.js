
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import Medium from "../../../../server/usecases/mongoose/Medium/index";
import Comment from "../../../../server/usecases/mongoose/Comment/index";
import {expectContains} from "../../../libaries/jest/index";

let mongoService;
let saveComment;

const clearData = async () => {
  await User.remove({});
  await Medium.remove({});
  await Comment.remove({});
};

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  saveComment = mutationResolver.saveComment;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation saveComment', () => {

  it('should test saveComment basic', async () => {

    const userIdKey = '5ab992fe05b6e9bf4c253b53';
    const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
    const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
    const userId = new ObjectId(userIdKey);
    const toUserId = new ObjectId(toUserIdKey);
    const mediumId = new ObjectId(mediumIdKey);

    // initial state
    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123'},
      {_id: toUserId, username: 'li', password: '123'},
    ]);

    await Medium.create(
      { _id: mediumId, userId, minioId: 'minioId0', category : 'beauty', kind : 'image' }
    );

    // perform operation
    const savedComment = await saveComment({}, {userId, mediumId, content: `That's great!`});

    // check result
    const comment = await Comment.findById(savedComment._id);
    const comments = await Comment.find({ mediumId });
    const medium = await Medium.findById(mediumId);

    expect(comment).toMatchObject({
      userId,
      mediumId,
      content: `That's great!`
    });

    expect(comments).toEqual(expectContains([{
      userId,
      mediumId,
      content: `That's great!`
    }]));

    expect(medium).toMatchObject({
      _id: mediumId,
      minioId: 'minioId0',
      category : 'beauty',
      kind : 'image',
      commentsCount: 1
    });

    await clearData();
  })
});