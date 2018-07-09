import mongoose from "mongoose";
import schema from './methods';

const TagLink = mongoose.model('TagLink', schema, 'tagLinks');

export default TagLink;