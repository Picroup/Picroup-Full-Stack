import {cursorQuery, ObjectId} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";
import {getCurrentTimestamp} from "../../../libraries/date";
import {predicateApplyBlockingStrategy} from "../../../usecases/mongoose/Blocking";

export const createInterestedMediaResolver = ({dependency: {
  FollowUserLink,
  Medium,
  User
  }}) => async ({_id: userId}, { cursor, queryUserId }) => {
  const links = await FollowUserLink.find({userId}).limit(0);
  const followingUserIds = links.map(link => link.toUserId).concat(new ObjectId(userId));
  const predicate = await predicateApplyBlockingStrategy({User})({
    userId: queryUserId,
    predicate: {userId: { $in: followingUserIds }, endedAt: {$gt: getCurrentTimestamp()}}
  });
  return await cursorQuery({
    Model: Medium,
    predicate: predicate,
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};