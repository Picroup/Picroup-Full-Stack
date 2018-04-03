import mongoose from 'mongoose';
import schema from './methods'

const Notification = mongoose.model('Notification', schema, 'notifications');

export default Notification;