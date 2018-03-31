import mongoose, { Schema } from 'mongoose';
import {getCurrentTimestamp} from "../../libraries/date/index";

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

const StarMediumLink = mongoose.model('StarMediumLink', schema, 'starMediumLinks');

export default StarMediumLink