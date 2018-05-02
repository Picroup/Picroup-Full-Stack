
export const recommendMedium = ({dependency: {
  MediumRecommendLink
  }}) => async (_, {mediumId, recommendMediumId}) => {
  return await MediumRecommendLink.increaseVote({mediumId, recommendMediumId})
    .then(link => link.vote);
};