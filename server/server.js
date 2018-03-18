import express from 'express';
import { graphql, graphiql} from "./services/graphql";
import bodyParser from 'body-parser';
import {s3, signed} from './services/minio';
import {PORT} from "./config";
import {connectMongoose} from "./services/mongoose";

const app = express();

app.use('/graphql', bodyParser.json(), graphql);
app.use('/graphiql', graphiql);
app.use('/s3', s3);
app.use('/signed', signed);

connectMongoose();

app.listen(PORT, () => console.info('Start listen on:', PORT));
