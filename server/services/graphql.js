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
import Notification from "../usecases/mongoose/Notification";
import MediumRecommendLink from "../usecases/mongoose/MediumRecommendLink";
import Feedback from "../usecases/mongoose/Feedback";
import VerifyCode from "../usecases/mongoose/VerifyCode";

const resolvers = createResolvers({dependency: {
    User,
    Medium,
    Comment,
    FollowUserLink,
    StarMediumLink,
    ReputationLink,
    Notification,
    MediumRecommendLink,
    Feedback,
    VerifyCode,
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