import schema from './schema';
import User from "./index";
import {incrementByKey} from "../../../libraries/mongoose";

schema.statics.increaseFollowingsCount = async (userId) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followingsCount',
    number: 1
  });
};

schema.statics.decreaseFollowingsCount = async (userId) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followingsCount',
    number: -1
  });
};

schema.statics.increaseFollowersCount = async (userId) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followersCount',
    number: 1
  });
};

schema.statics.decreaseFollowersCount = async (userId) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followersCount',
    number: -1
  });
};

schema.statics.increaseReputation = async ({userId, reputation}) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'reputation',
    number: reputation
  });
};

schema.statics.increaseNotificationsCount = async (userId) => {
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'notificationsCount',
    number: 1
  });
};

schema.statics.clearNotificationsCount = async (userId) => {
  return await User.findByIdAndUpdate(userId, { $set: {notificationsCount: 0} }, {new: true});
};

export default schema;