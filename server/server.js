import express from 'express';
import { graphql, graphiql} from "./middlewares/graphql";
import bodyParser from 'body-parser';
import _ from './middlewares/minio';
import {PORT} from "./config";

const app = express();

app.use('/graphql', bodyParser.json(), graphql);
app.use('/graphiql', graphiql);

app.listen(PORT, () => console.info('Start listen on:', PORT));
