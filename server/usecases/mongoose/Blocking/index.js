
export const predicateApplyBlockingStrategy = ({User}) => async ({userId, predicate}) => {
  if (!userId) return predicate;
  predicate = predicate || {};
  const { blockingUserIds, blockedUserIds } = await User.findById(userId);
  console.log('blockingUserIds', blockingUserIds);
  console.log('blockedUserIds', blockedUserIds);
  const blockUserIds = blockingUserIds.concat(blockedUserIds);
  console.log('blockUserIds', blockUserIds);
  const result = {
    $and: [
      predicate,
      {userId: {$nin: blockUserIds}},
    ]
  };
  console.log('predicate', result);
  return result;
};