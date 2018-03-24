import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import {makeExecutableSchema} from "graphql-tools/dist/index";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const formatError = (error) => {
  return {
    ...error,
    code: error.originalError && error.originalError.code
  }
};

const graphql = graphqlExpress({ schema, formatError });
const graphiql = graphiqlExpress({ endpointURL: '/graphql' });

export { graphql, graphiql };