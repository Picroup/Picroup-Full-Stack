import mongoose from "mongoose";
import schema from "./methods";

const Comment = mongoose.model('Comment', schema, 'createCommentsResolver');

export default Comment;