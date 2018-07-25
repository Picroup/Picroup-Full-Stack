import express from 'express';
import { graphql, graphiql} from "./services/graphql";
import bodyParser from 'body-parser';
import {files, s3, signed} from './services/minio';
import {connectMongoose} from "./services/mongoose";
import {scheduleJob} from "./services/scheduleJob";
import {createServer} from "./services/createServer";

const app = express();

app.use('/graphql', bodyParser.json(), graphql);
app.use('/graphiql', graphiql);
app.use('/s3', s3);
app.use('/files', files);
app.use('/signed', signed);

connectMongoose();
scheduleJob();

const server = createServer(app);
