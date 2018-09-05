
export const createSearchUserResolver = ({dependency: {
  User,
}}) => async (_, {username}) => {
  return await User.findOne({username});
};