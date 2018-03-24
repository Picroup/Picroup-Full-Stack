import mongoose from 'mongoose';
import {
  MONGODB_DATABASE as database,
  MONGODB_HOST as host,
  MONGODB_PORT as port,
  MONGODB_USER as user,
  MONGODB_PASSWORD as pass,
} from "../config";

export const connectMongoose = () => {

  mongoose.connect(`mongodb://${host}:${port}/${database}`, { user, pass })
    .then(() =>     console.log('mongoose connect success.'))
    .catch(error => console.error('mongoose connect fail:', error));
};
