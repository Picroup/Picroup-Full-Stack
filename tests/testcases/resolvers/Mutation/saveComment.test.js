
import MongoTestService from "../../../usecases/mongdbserver/MongoTestService";
import mutationResolver from "./mutationResolver";
import {ObjectId} from "../../../../server/libraries/mongoose/index";
import User from "../../../../server/usecases/mongoose/User/index";
import Medium from "../../../../server/usecases/mongoose/Medium/index";
import Comment from "../../../../server/usecases/mongoose/Comment/index";
import Notification from "../../../../server/usecases/mongoose/Notification/index";
import NotificationKind from "../../../../server/usecases/model/NotificationKind";

let mongoService;
let saveComment;


beforeAll(async () => {
  mongoService = new MongoTestService({});
  await mongoService.start();
  saveComment = mutationResolver.saveComment;
});

afterAll(async () => {
  await mongoService.stop()
});

describe('Resolver Mutation saveComment', () => {

  const userIdKey = '5ab992fe05b6e9bf4c253b53';
  const toUserIdKey = '5abb34e67f9f4cf1429de9b0';
  const mediumIdKey = '5abb36d47f9f4cf1429de9b1';
  const userId = new ObjectId(userIdKey);
  const toUserId = new ObjectId(toUserIdKey);
  const mediumId = new ObjectId(mediumIdKey);


  beforeEach(async () => {
    await User.insertMany([
      {_id: userId, username: 'luojie', password: '123', phoneNumber: "0"},
      {_id: toUserId, username: 'li', password: '123', phoneNumber: "01"},
    ]);

    await Medium.create(
      { _id: mediumId, userId: toUserId, minioId: 'minioId0', kind : 'image' }
    );
  });

  afterEach(async () => {
    await User.remove({});
    await Medium.remove({});
    await Comment.remove({});
    await Notification.remove({});
  });

  describe('basic', async () => {

    it('should test comment', async () => {

      const savedComment = await saveComment({}, {userId, mediumId, content: `That's great!`});
      const comment = await Comment.findById(savedComment._id);

      expect(comment).toMatchObject({
        userId,
        mediumId,
        content: `That's great!`
      });

    });

    it('should test medium', async () => {

      await saveComment({}, {userId, mediumId, content: `That's great!`});
      const medium = await Medium.findById(mediumId);

      expect(medium).toMatchObject({
        _id: mediumId,
        userId: toUserId,
        minioId: 'minioId0',
        kind: 'image',
        commentsCount: 1
      });

    });

    it('should test notification', async () => {

      await saveComment({}, {userId, mediumId, content: `That's great!`});
      const notification = await Notification.findOne({userId, mediumId, kind: NotificationKind.commentMedium});

      expect(notification).toMatchObject({
        userId,
        toUserId,
        mediumId,
        kind: NotificationKind.commentMedium,
        content: `That's great!`,
        viewed: false
      });

    });

  });

});