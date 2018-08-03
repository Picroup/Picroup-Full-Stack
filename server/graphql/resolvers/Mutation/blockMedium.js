
export const createBlockMediumResolver = ({dependency: {
  User,
}}) => async (_, {userId, mediumId}) => {
  return await User.addBlockingMediumId({userId, mediumId});
};