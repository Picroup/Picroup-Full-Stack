
export const createUserResolver = ({dependency: {
  User
  }}) => async (_, { userId }) =>
  await User.findById(userId)
;