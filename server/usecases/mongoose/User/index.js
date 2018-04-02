import mongoose from "mongoose";
import schema from './methods';

const User = mongoose.model('User', schema, 'users');

export default User;