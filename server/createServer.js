import fs from 'fs';
import {PORT, SSL_CERT_PATH, SSL_KEY_PATH} from "./config";
import https from 'https';

const httpsOptions = {
  cert: fs.readFileSync(SSL_CERT_PATH),
  key: fs.readFileSync(SSL_KEY_PATH),
};

const createServer = (app) => https.createServer(httpsOptions, app)
  .listen(PORT, () => console.info('Start listen on:', PORT));

export {createServer};
