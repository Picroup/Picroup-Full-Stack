
export const predicateApplyBlockingStrategy = ({User}) => async ({userId, predicate}) => {
  if (!userId) return predicate;
  predicate = predicate || {};
  const { blockingUserIds, blockedUserIds, blockingMediumIds } = await User.findById(userId);
  const blockUserIds = blockingUserIds.concat(blockedUserIds);
  const result = {
    $and: [
      predicate,
      {userId: {$nin: blockUserIds}},
      {_id: {$nin: blockingMediumIds}}
    ]
  };
  console.log('predicate', result);
  return result;
};