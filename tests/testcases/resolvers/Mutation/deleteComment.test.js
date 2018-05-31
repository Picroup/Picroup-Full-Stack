
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import Medium from "../../../../server/usecases/mongoose/Medium/index";
import Comment from "../../../../server/usecases/mongoose/Comment/index";

let mongoService;
let deleteComment;

beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  deleteComment = mutationResolver.deleteComment;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation saveComment', () => {

  const userId = new ObjectId('5ab992fe05b6e9bf4c253b53');
  const toUserId = new ObjectId('5abb34e67f9f4cf1429de9b0');
  const mediumId = new ObjectId('5abb36d47f9f4cf1429de9b1');
  const commentId = new ObjectId('5ad8a7041cae4811b1fd545c');

  beforeEach(async () => {

    await Medium.create(
      { _id: mediumId, userId: toUserId, minioId: 'minioId0', kind : 'image', commentsCount: 1 }
    );

    await Comment.insertMany([
      {_id: commentId, userId, mediumId, content: `That's great!`},
    ]);
  });

  afterEach(async () => {
    await Medium.remove({});
    await Comment.remove({});
  });

  describe('basic', async () => {

    it('should test deleted', async () => {

      const deleted = await deleteComment({}, {commentId: commentId.toString()});

      expect(deleted).toEqual(commentId.toString());
    });

    it('should test comment', async () => {

      await deleteComment({}, {commentId: commentId.toString()});
      const comment = await Comment.findById(commentId);

      expect(comment).toBeNull();
    });

    it('should test medium', async () => {

      await deleteComment({}, {commentId: commentId.toString()});
      const medium = await Medium.findById(mediumId);

      expect(medium).toMatchObject({
        _id: mediumId,
        userId: toUserId,
        minioId: 'minioId0',
        kind: 'image',
        commentsCount: 0
      });
    });

  });
});