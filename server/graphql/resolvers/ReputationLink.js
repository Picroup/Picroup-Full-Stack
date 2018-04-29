
export const createReputationLinkResolver = ({dependency: {
    User,
    Medium,
}}) => ({

  user: async ({ userId }) => {
    return await User.findById(userId);
  },

  medium: async ({mediumId}) => {
    if (!mediumId) return null;
    return Medium.findById(mediumId);
  },
});