import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from 'mongoose'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000000;

class MongoTestService {

  constructor({onStart, onStop}) {
    this.onStart = onStart;
    this.onStop = onStop;
    this.mongoServer = new MongodbMemoryServer({binary: {version: '3.6.2'}});
  }

  start = async () => {
    const mongoUri = await this.mongoServer.getConnectionString();
    await mongoose.connect(mongoUri);
    this.onStart && await this.onStart();
  };

  stop = async () => {
    this.onStop && await this.onStop();
    await mongoose.disconnect();
    this.mongoServer.stop()
  };
}

export default MongoTestService;