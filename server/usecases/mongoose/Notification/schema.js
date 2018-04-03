import {getCurrentTimestamp} from "../../../libraries/date";
import {Schema} from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  mediumId: {
    type: Schema.Types.ObjectId,
    required: false
  },
  content: {
    type: String,
    required: false
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
  viewed: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default schema;