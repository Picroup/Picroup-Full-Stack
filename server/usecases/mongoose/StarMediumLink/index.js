import mongoose from "mongoose";
import schema from './methods';

const StarMediumLink = mongoose.model('StarMediumLink', schema, 'starMediumLinks');

export default StarMediumLink