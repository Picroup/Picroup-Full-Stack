

export const createMediumResolver = ({dependency: {
  Medium
  }}) => async (_, { mediumId }) =>
  await Medium.findById(mediumId)
;