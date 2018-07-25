import {Schema} from "mongoose";

const schema = new Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  demand: {
    type: Number,
    required: true,
    default: 0
  },
  supply: {
    type: Number,
    required: true,
    default: 0
  },
  satisfy: {
    type: Number,
    required: true,
    default: 0
  },
});

export default schema;