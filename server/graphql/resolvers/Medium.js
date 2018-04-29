import {PAGE_LIMIT} from "../../config";
import {cursorQuery} from "../../libraries/mongoose";

export const createMediumResolver = ({dependency: {
  Comment,
  StarMediumLink,
  User,
}}) => ({

  comments: async ({_id: mediumId}, { cursor }) => {
    return await cursorQuery({
      Model: Comment,
      predicate: {mediumId},
      sortBy: 'createdAt',
      ascending: -1
    })({cursor, limit: PAGE_LIMIT});
  },

  stared: async ({_id: mediumId}, { userId }) => {
    return await StarMediumLink
      .find({userId, mediumId})
      .limit(1)
      .count()
      .exec();
  },

  user: async ({ userId }) => {
    return await User.findById(userId);
  }
});