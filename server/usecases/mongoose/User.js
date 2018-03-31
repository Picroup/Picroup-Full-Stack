import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followingsCount: {
    type: Number,
    required: true,
    default: 0
  },
  followersCount: {
    type: Number,
    required: true,
    default: 0
  },
  reputation: {
    type: Number,
    required: true,
    default: 10
  }
});

const User = mongoose.model('User', schema, 'users');

export default User;