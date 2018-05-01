import {Schema} from "mongoose";

const schema = new Schema({
  mediumId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  recommendMediumId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  unique: {
    type: String,
    require: true,
    unique: true,
  },
  vote: {
    type: Number,
    required: true,
  },
});

export default schema;