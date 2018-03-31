import mongoose from "mongoose";
import schema from "./methods";

const FollowUserLink = mongoose.model('FollowUserLink', schema, 'followUserLinks');

export default FollowUserLink;