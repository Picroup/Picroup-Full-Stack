import schema from './schema';
import FollowUserLink from "./index";

const createUnique = ({userId, toUserId}) => `${userId}_${toUserId}`;

schema.statics.saveLink = async ({userId, toUserId}) => {
  const unique = createUnique({userId, toUserId});
  const followUserLink = new FollowUserLink({
    unique,
    userId,
    toUserId
  });
  return await followUserLink.save();
};

schema.statics.removeLink = async ({userId, toUserId}) => {
  const unique = createUnique({userId, toUserId});
  return await FollowUserLink.remove({ unique });
};

export default schema;