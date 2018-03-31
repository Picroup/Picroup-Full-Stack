import schema from './schema';
import StarMediumLink from "./index";

const createUnique = ({userId, mediumId}) => `${userId}_${mediumId}`;

schema.statics.saveLink = async ({userId, mediumId}) => {
  const unique = createUnique({userId, mediumId});
  const starMediumLink = new StarMediumLink({
    unique,
    userId,
    mediumId,
  });
  return await starMediumLink.save();
};

export default schema;