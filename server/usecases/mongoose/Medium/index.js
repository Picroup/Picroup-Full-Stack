import mongoose from 'mongoose';
import schema from './methods'

const Medium = mongoose.model('Medium', schema, 'media');

export default Medium;