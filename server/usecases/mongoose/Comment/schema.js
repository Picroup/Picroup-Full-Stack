import {getCurrentTimestamp} from "../../../libraries/date";
import {Schema} from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mediumId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: getCurrentTimestamp
  },
  content: {
    type: String,
    required: true,
  }
});

export default schema