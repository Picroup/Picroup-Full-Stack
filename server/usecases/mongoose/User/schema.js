import {Schema} from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
    default: function () {
      return this.username;
    }
  },
  avatarId: {
    type: String,
    required: false,
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
    default: 0
  },
  notificationsCount: {
    type: Number,
    required: true,
    default: 0
  },
  gainedReputation: {
    type: Number,
    required: true,
    default: 0
  },
  blockingUserIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: []
  },
  blockedUserIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: []
  },
});

export default schema;