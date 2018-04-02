import MongodbMemoryServer from "mongodb-memory-server";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000;

export const createMongoServer = () => new MongodbMemoryServer({binary: {version: '3.6.2'}});

export const connectMongoServer = async (mongoose, mongoServer) => {
  const mongoUri = await mongoServer.getConnectionString();
  return await mongoose.connect(mongoUri);
};