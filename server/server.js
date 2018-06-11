import express from 'express';
import { graphql, graphiql} from "./services/graphql";
import bodyParser from 'body-parser';
import {s3, signed} from './services/minio';
import {connectMongoose} from "./services/mongoose";
import {createServer} from "./createServer";

const app = express();

app.use('/graphql', bodyParser.json(), graphql);
app.use('/graphiql', graphiql);
app.use('/s3', s3);
app.use('/signed', signed);

connectMongoose();

const server = createServer(app);
