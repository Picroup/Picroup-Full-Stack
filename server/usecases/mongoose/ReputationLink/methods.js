import schema from './schema';
import {FOLLOW_USER, reputationValue, SAVE_MEDIUM, STAR_MEDIUM} from "../../model/ReputationKind";
import ReputationLink from "./index";

const uniqueBySaveMedium = (mediumId) => `${SAVE_MEDIUM}_${mediumId}`;
const uniqueByStarMedium = (userId, mediumId) => `${STAR_MEDIUM}_${userId}_${mediumId}`;
const uniqueByFollowUser = (userId, toUserId) => `${FOLLOW_USER}_${userId}_${toUserId}`;

schema.statics.savePostMediumLink = async ({userId, mediumId, toUserId}) => {

  const kind = SAVE_MEDIUM;
  const reputationUnique = uniqueBySaveMedium(mediumId);
  const value = reputationValue(kind);

  const reputation = new ReputationLink({
    userId,
    mediumId,
    toUserId,
    kind,
    unique: reputationUnique,
    value
  });

  return await reputation.save();
};

schema.statics.saveStarMediumLink = async ({userId, mediumId, toUserId}) => {

  const kind = STAR_MEDIUM;
  const reputationUnique = uniqueByStarMedium(userId, mediumId);
  const value = reputationValue(kind);

  const reputation = new ReputationLink({
    userId,
    mediumId,
    toUserId,
    kind,
    unique: reputationUnique,
    value
  });

  return await reputation.save();
};

schema.statics.saveFollowUserLink = async ({userId, toUserId}) => {

  const kind = FOLLOW_USER;
  const reputationUnique = uniqueByFollowUser(userId, toUserId);
  const value = reputationValue(kind);

  const reputation = new ReputationLink({
    userId,
    toUserId,
    kind,
    unique: reputationUnique,
    value
  });

  return await reputation.save();
};

schema.statics.findSaveMediumLink = async (mediumId) => {
  const reputationUnique = uniqueBySaveMedium(mediumId);
  return await ReputationLink.findOne({unique: reputationUnique});
};


export default schema;