import mongoose, {Schema} from "mongoose";

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


const VerifyCode = mongoose.model('VerifyCode', schema, 'verifyCodes');

export default VerifyCode;