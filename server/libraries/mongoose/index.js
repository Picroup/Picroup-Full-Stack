
export const modelsByIds = async (Model, ids) => {

  const query = [
    {$match: {_id: {$in: ids}}},
    {$addFields: {"__order": {$indexOfArray: [ids, "$_id" ]}}},
    {$sort: {"__order": 1}}
  ];

  return await Model.aggregate(query);
};

export const cursorQuery =  ({ Model, predicate, sortBy, ascending, projection }) => async ({cursor, limit}) => {
  predicate = predicate || {};
  limit = limit || 12;
  const gtOrLt = ascending > 0 ? '$gt' : '$lt';
  if (cursor !== null) { predicate[sortBy] =  { [gtOrLt]: cursor } }

  const queryCount = limit + 1;

  const items = await Model.find(predicate, projection)
    .sort({[sortBy]: ascending})
    .limit(queryCount)
    .exec();

  const hasMore = items.length === queryCount;
  const newCursor = hasMore ? items.popped().last()[sortBy] : null;

  return {
    cursor: newCursor,
    items
  }
};
