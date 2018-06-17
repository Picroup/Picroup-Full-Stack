
export const createMarkReputationLinksAsViewedResolver = ({dependency: {
  ReputationLink,
  User
  }}) => async ({_id: userId}) => {
  await ReputationLink.markReputationLinksAsViewed(userId);
  return await User.clearGainedReputation(userId);
};