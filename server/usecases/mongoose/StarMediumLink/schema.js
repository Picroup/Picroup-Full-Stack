import {getCurrentTimestamp} from "../../../libraries/date";
import {Schema} from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  mediumId: {
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
    require: true,
    default: getCurrentTimestamp
  }
});

export default schema;