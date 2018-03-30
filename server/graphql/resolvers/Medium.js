import {PAGE_LIMIT} from "../../config";
import Comment from "../../usecase/mongoose/Comment";

export default {

  comments: async ({_id}, { cursor }) => {
    let predicate = { mediumId: _id };
    if (cursor) { predicate.createdAt = { $lt: cursor } }

    const comments = await Comment.find(predicate)
      .sort({createdAt: -1})
      .limit(PAGE_LIMIT)
      .exec();

    const hasMore = comments.length === PAGE_LIMIT;
    const newCursor = hasMore ? comments.last().createdAt : null;

    return {
      cursor: newCursor,
      items: comments
    }
  },
};