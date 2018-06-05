import {getCurrentTimestamp} from "../../../libraries/date";
import {Schema} from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    required: false
  },
  mediumId: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  createdAt: {
    type: Number,
    required: true,
    default: getCurrentTimestamp
  },
  kind: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
});

export default schema;