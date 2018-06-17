
export const createUserResolver = ({dependency: {
  User,
}}) => async ({ userId }) => {
  return await User.findById(userId);
};