import mongoose from 'mongoose';
import schema from './methods'

const ReputationLink = mongoose.model('ReputationLink', schema, 'reputationLinks');

export default ReputationLink;