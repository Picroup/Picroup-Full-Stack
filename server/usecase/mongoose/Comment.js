import mongoose , { Schema } from 'mongoose';
import {getCurrentTimestamp} from "../../libraries/date/index";

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

const Comment = mongoose.model('Comment', schema, 'comments');

export default Comment;