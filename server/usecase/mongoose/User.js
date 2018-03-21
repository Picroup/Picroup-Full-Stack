import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', schema, 'users');

export default User;