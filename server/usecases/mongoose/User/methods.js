import schema from './schema';
import User from "./index";
import {incrementByKey} from "../../../libraries/mongoose";


schema.statics.increaseFollowingsCount = async (userId) =>{
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followingsCount',
    number: 1
  });
};

schema.statics.decreaseFollowingsCount = async (userId) =>{
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followingsCount',
    number: -1
  });
};

schema.statics.increaseFollowersCount = async (userId) =>{
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followersCount',
    number: 1
  });
};

schema.statics.decreaseFollowersCount = async (userId) =>{
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'followersCount',
    number: -1
  });
};

schema.statics.increaseReputation = async ({userId, reputation}) =>{
  return await incrementByKey({
    Model: User,
    _id: userId,
    key: 'reputation',
    number: reputation
  });
};

export default schema;