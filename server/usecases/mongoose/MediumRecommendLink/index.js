import mongoose from 'mongoose';
import schema from './methods'

const MediumRecommendLink = mongoose.model('MediumRecommendLink', schema, 'mediumRecommendLinks');

export default MediumRecommendLink;