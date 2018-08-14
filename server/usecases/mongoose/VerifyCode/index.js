import mongoose, {Schema} from "mongoose";
import schema from './methods';

const VerifyCode = mongoose.model('VerifyCode', schema, 'verifyCodes');

export default VerifyCode;