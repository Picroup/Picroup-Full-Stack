
export const user = ({dependency: {
  User,
}}) => async ({ userId }) => {
  return await User.findById(userId);
};