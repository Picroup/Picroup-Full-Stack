
export const createStaredResolver = ({dependency: {
  StarMediumLink,
}}) => async ({_id: mediumId}, { userId }) => {
  return await StarMediumLink
    .find({userId, mediumId})
    .limit(1)
    .count()
    .exec();
};