import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import {makeExecutableSchema} from "graphql-tools/dist/index";
import {createResolvers} from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import User from "../usecases/mongoose/User";
import Medium from "../usecases/mongoose/Medium";
import Comment from "../usecases/mongoose/Comment";
import FollowUserLink from "../usecases/mongoose/FollowUserLink";
import StarMediumLink from "../usecases/mongoose/StarMediumLink";
import ReputationLink from "../usecases/mongoose/ReputationLink";

const resolvers = createResolvers({dependency: {
    User,
    Medium,
    Comment,
    FollowUserLink,
    StarMediumLink,
    ReputationLink,
  }});

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