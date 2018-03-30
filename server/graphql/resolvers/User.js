import Medium from "../../usecase/mongoose/Medium";
import {PAGE_LIMIT} from "../../config";
import {cursorQuery, modelsByIds} from "../../libraries/mongoose";
import FollowUserLink from "../../usecase/mongoose/FollowUserLink";
import mongoose from "mongoose";
import User from "../../usecase/mongoose/User";

export default {

  followings: async ({_id: userId}, { cursor }) => {
    const { cursor: newCursor, items: links } = await cursorQuery({
      Model: FollowUserLink,
      predicate: {userId},
      sortBy: 'createdAt',
      ascending: -1
    })({cursor, limit: 1});

    const followingUserIds = links.map(link => link.toUserId);
    const users = await modelsByIds(User, followingUserIds);

    return {
      cursor: newCursor,
      items: users
    }
  },

  followers: async ({_id: userId}, { cursor }) => {
    const { cursor: newCursor, items: links } = await cursorQuery({
      Model: FollowUserLink,
      predicate: { toUserId: userId },
      sortBy: 'createdAt',
      ascending: -1
    })({cursor, limit: PAGE_LIMIT});

    const followerUserIds = links.map(link => link.userId);
    const users = await modelsByIds(User, followerUserIds);

    return {
      cursor: newCursor,
      items: users
    }
  },

  interestedMedia: async ({_id: userId}, { cursor }) => {
    const links = await FollowUserLink.find({userId});
    const followingUserIds = links.map(link => link.toUserId).concat(new mongoose.Types.ObjectId(userId));

    return await cursorQuery({
      Model: Medium,
      predicate: {userId: { $in: followingUserIds }},
      sortBy: 'createdAt',
      ascending: -1
    })({cursor, limit: 1});
  },

  media: async ({_id: userId}, {cursor}) => {
    return await cursorQuery({
      Model: Medium,
      predicate: {userId},
      sortBy: 'createdAt',
      ascending: -1
    })({cursor, limit: PAGE_LIMIT});
  }
}