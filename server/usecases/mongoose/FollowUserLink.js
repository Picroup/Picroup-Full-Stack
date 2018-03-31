import mongoose, { Schema } from 'mongoose';
import {getCurrentTimestamp} from "../../libraries/date/index";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  unique: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: getCurrentTimestamp
  },
});

const FollowUserLink = mongoose.model('FollowUserLink', schema, 'followUserLinks');

export default FollowUserLink;