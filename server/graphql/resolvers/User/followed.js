
export const createFollowedResolver = ({dependency: {
  FollowUserLink
  }}) => async ({_id: toUserId}, { byUserId: userId }) => {
  if (toUserId.equals(userId)) return null;
  return await FollowUserLink
    .find({userId, toUserId})
    .limit(1)
    .count()
    .exec();
};

