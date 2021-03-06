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
  unique: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Number,
    required: true,
    default: getCurrentTimestamp
  },
  value: {
    type: Number,
    required: true
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