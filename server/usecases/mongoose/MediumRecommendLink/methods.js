import schema from './schema'
import MediumRecommendLink from "./index";

const createUnique = ({mediumId, recommendMediumId}) => `${mediumId}_${recommendMediumId}`;

schema.statics.increaseVote = async ({mediumId, recommendMediumId}) => {
  const unique = createUnique({mediumId, recommendMediumId});
  return await MediumRecommendLink.findOneAndUpdate(
    {unique},
    {$inc: {vote: 1}, $set: {mediumId, recommendMediumId}},
    {new: true, upsert: true}
  );
};

export default schema;