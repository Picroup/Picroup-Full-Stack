import express from 'express';
import { graphql, graphiql} from "./middlewares/graphql";
import bodyParser from 'body-parser';

const app = express();

app.use('/graphql', bodyParser.json(), graphql);
app.use('/graphiql', graphiql);

app.listen(3000, () => console.info('Start listen on:', 3000));
