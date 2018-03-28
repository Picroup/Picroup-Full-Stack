import mongoose, { Schema } from 'mongoose';
import {getCurrentTimestamp} from "../../libraries/date";

const schema = new Schema({
  userId: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: Number,
    default: getCurrentTimestamp
  },
  endedAt: {
    required: true,
    type: Number,
    default: getCurrentTimestamp
  },
  category: {
    required: true,
    type: String
  },
  kind: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  },
  minioId: {
    required: true,
    type: String
  }
});

const Medium = mongoose.model('Medium', schema, 'media');

export default Medium;