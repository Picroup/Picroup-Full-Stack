/**
 * Created by Air on 2018/8/14.
 */

import {Schema} from "mongoose";

const schema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expiredAt: {
    type: Number,
    required: true,
  },
});


export default schema;