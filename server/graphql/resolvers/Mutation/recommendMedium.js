
export const createRecommendMediumResolver = ({dependency: {
  MediumRecommendLink
  }}) => async (_, {mediumId, recommendMediumId}) => {
  return await MediumRecommendLink.increaseVote({mediumId, recommendMediumId})
    .then(link => link.vote);
};