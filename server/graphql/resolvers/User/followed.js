
export const createFollowedResolver = ({dependency: {
  FollowUserLink
  }}) => async ({_id: toUserId}, { byUserId: userId }) => {
  if (userId === toUserId) return null;
  return await FollowUserLink
    .find({userId, toUserId})
    .limit(1)
    .count()
    .exec();
};