import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import {makeExecutableSchema} from "graphql-tools/dist/index";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const graphql = graphqlExpress({ schema });
const graphiql = graphiqlExpress({ endpointURL: '/graphql' });

export { graphql, graphiql };