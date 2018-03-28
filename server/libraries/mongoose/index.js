
export const modelsByIds = async (Model, ids) => {

  const query = [
    {$match: {_id: {$in: ids}}},
    {$addFields: {"__order": {$indexOfArray: [ids, "$_id" ]}}},
    {$sort: {"__order": 1}}
  ];

  return await Model.aggregate(query);
};