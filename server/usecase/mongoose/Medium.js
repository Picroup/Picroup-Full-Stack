import mongoose, { Schema } from 'mongoose';
import {getCurrentTimestamp} from "../../libraries/date";

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
    default: getCurrentTimestamp
  },
  category: {
    type: String,
    required: true,
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
  }
});

const Medium = mongoose.model('Medium', schema, 'media');

export default Medium;