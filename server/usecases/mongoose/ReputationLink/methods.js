import schema from './schema';
import ReputationKind from "../../model/ReputationKind";
import ReputationLink from "./index";

const uniqueBySaveMedium = (mediumId) => `${ReputationKind.saveMedium}_${mediumId}`;
const uniqueByStarMedium = ({userId, mediumId}) => `${ReputationKind.starMedium}_${userId}_${mediumId}`;
const uniqueByFollowUser = ({userId, toUserId}) => `${ReputationKind.followUser}_${userId}_${toUserId}`;

schema.statics.savePostMediumLink = async ({userId, mediumId, toUserId}) => {

  const kind = ReputationKind.saveMedium;
  const reputationUnique = uniqueBySaveMedium(mediumId);
  const value = ReputationKind.reputationValue(kind);

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

  const kind = ReputationKind.starMedium;
  const reputationUnique = uniqueByStarMedium({userId, mediumId});
  const value = ReputationKind.reputationValue(kind);

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

  const kind = ReputationKind.followUser;
  const reputationUnique = uniqueByFollowUser({userId, toUserId});
  const value = ReputationKind.reputationValue(kind);

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

schema.statics.findStarMediumLink = async ({userId, mediumId}) => {
  const reputationUnique = uniqueByStarMedium({userId, mediumId});
  return await ReputationLink.findOne({unique: reputationUnique});
};


export default schema;