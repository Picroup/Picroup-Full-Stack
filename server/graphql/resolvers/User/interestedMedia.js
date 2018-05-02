import mongoose from "mongoose";
import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";


export const createInterestedMediaResolver = ({dependency: {
  FollowUserLink,
  Medium
  }}) => async ({_id: userId}, { cursor }) => {
  const links = await FollowUserLink.find({userId}).limit(0);
  const followingUserIds = links.map(link => link.toUserId).concat(new mongoose.Types.ObjectId(userId));

  return await cursorQuery({
    Model: Medium,
    predicate: {userId: { $in: followingUserIds }},
    sortBy: 'createdAt',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});
};