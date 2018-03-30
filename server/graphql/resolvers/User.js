import Medium from "../../usecase/mongoose/Medium";
import {PAGE_LIMIT} from "../../config";
import {modelsByIds} from "../../libraries/mongoose";
import FollowUserLink from "../../usecase/mongoose/FollowUserLink";
import mongoose from "mongoose";
import User from "../../usecase/mongoose/User";

export default {

  followings: async ({_id}, { cursor }) => {
    let predicate = { userId: _id };
    if (cursor) { predicate.createdAt = { $lt: cursor } }

    const links = await FollowUserLink.find(predicate)
      .sort({createdAt: -1})
      .limit(PAGE_LIMIT)
      .exec();

    const followingUserIds = links.map(link => link.toUserId);
    const users = await modelsByIds(User, followingUserIds);

    const hasMore = links.length === PAGE_LIMIT;
    const newCursor = hasMore ? links.last().createdAt : null;

    return {
      cursor: newCursor,
      users
    }
  },

  followers: async ({_id}, { cursor }) => {
    let predicate = { toUserId: _id };
    if (cursor) { predicate.createdAt = { $lt: cursor } }

    const links = await FollowUserLink.find(predicate)
      .sort({createdAt: -1})
      .limit(PAGE_LIMIT)
      .exec();

    const followerUserIds = links.map(link => link.userId);
    const users = await modelsByIds(User, followerUserIds);

    const hasMore = links.length === PAGE_LIMIT;
    const newCursor = hasMore ? links.last().createdAt : null;

    return {
      cursor: newCursor,
      users
    }
  },

  interestedMedia: async ({_id}, { cursor }) => {
    const links = await FollowUserLink.find({userId: _id});
    const followingUserIds = links.map(link => link.toUserId).concat(new mongoose.Types.ObjectId(_id));

    let predicate = {userId: { $in: followingUserIds }};
    if (cursor) { predicate.createdAt = { $lt: cursor } }

    const media = await Medium.find(predicate)
      .sort({createdAt: -1})
      .limit(PAGE_LIMIT)
      .exec();

    const hasMore = media.length === PAGE_LIMIT;
    const newCursor = hasMore ? media.last().createdAt : null;

    return {
      cursor: newCursor,
      media
    }
  },

  media: async ({_id}, {cursor}) => {

    let predicate = {userId: _id};
    if (cursor) { predicate.createdAt = { $lt: cursor } }

    const media =  await Medium.find(predicate)
      .sort({createdAt: -1})
      .limit(PAGE_LIMIT)
      .exec();

    const hasMore = media.length === PAGE_LIMIT;
    const newCursor = hasMore ? media.last().createdAt : null;

    return {
      cursor: newCursor,
      media
    }
  }
}