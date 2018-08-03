
export const predicateApplyBlockingStrategy = ({User}) => async ({userId, predicate}) => {
  if (!userId) return predicate;
  predicate = predicate || {};
  const { blockingUserIds, blockedUserIds } = await User.findById(userId);
  const blockUserIds = blockingUserIds.concat(blockedUserIds);
  const result = {
    $and: [
      predicate,
      {userId: {$nin: blockUserIds}},
    ]
  };
  console.log('predicate', result);
  return result;
};