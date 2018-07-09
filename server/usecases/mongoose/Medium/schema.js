import {getCurrentTimestamp, maybeOneMonth} from "../../../libraries/date";
import {Schema} from "mongoose";

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: getCurrentTimestamp
  },
  endedAt: {
    type: Number,
    required: true,
    default: () => getCurrentTimestamp() + 2 * maybeOneMonth
  },
  tags: {
    type: [String],
    required: false,
  },
  kind: {
    type: String,
    required: true,
  },
  detail: {
    type: Object
  },
  minioId: {
    type: String,
    required: true,
  },
  commentsCount: {
    type: Number,
    required: true,
    default: 0
  }
});

export default schema;