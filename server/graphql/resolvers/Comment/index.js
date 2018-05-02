
export const createCommentResolver = ({dependency: {
  User,
}}) => ({

  user: async ({ userId }) => {
    return await User.findById(userId);
  }
});