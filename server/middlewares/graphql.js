import schema from "../graphql/schema";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";

const graphql = graphqlExpress({schema});
const graphiql = graphiqlExpress({ endpointURL: '/graphql' });

export { graphql, graphiql };