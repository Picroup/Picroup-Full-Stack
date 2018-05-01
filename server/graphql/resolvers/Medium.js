import {PAGE_LIMIT} from "../../config";
import {cursorQuery, modelsByIds} from "../../libraries/mongoose";

export const createMediumResolver = ({dependency: {
  Comment,
  StarMediumLink,
  User,
  MediumRecommendLink,
  Medium,
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
  },

  recommendedMedia: async ({_id: mediumId}, { cursor }) => {

    const {
      cursor: newCursor,
      items: links
    } = await cursorQuery({
      Model: MediumRecommendLink,
      predicate: {mediumId},
      sortBy: 'vote',
      ascending: -1
    })({cursor, limit: PAGE_LIMIT});

    const mediumIds = links.map(link => link.recommendMediumId);
    const media = await modelsByIds(Medium, mediumIds);

    return {
      cursor: newCursor,
      items: media
    };
  },

});