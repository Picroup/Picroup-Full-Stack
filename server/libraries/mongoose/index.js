
export const modelsByIds = async (Model, ids) => {

  const query = [
    {$match: {_id: {$in: ids}}},
    {$addFields: {"__order": {$indexOfArray: [ids, "$_id" ]}}},
    {$sort: {"__order": 1}}
  ];

  return await Model.aggregate(query);
};

export const cursorQuery =  ({ Model, predicate, sortBy, ascending }) => async ({cursor, limit}) => {
  predicate = predicate || {};
  const gtOrLt = ascending > 0 ? '$gt' : '$lt';
  if (cursor) { predicate[sortBy] =  { [gtOrLt]: cursor } }

  const queryCount = limit + 1;

  const items = await Model.find(predicate)
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
