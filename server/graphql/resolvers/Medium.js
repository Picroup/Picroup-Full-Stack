import {PAGE_LIMIT} from "../../config";
import Comment from "../../usecase/mongoose/Comment";
import StarMediumLink from "../../usecase/mongoose/StarMediumLink";
import {cursorQuery} from "../../libraries/mongoose";


export default {

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
};