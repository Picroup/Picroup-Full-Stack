import {createMutationResolver} from "../../../../server/graphql/resolvers/Mutation";
import User from "../../../../server/usecases/mongoose/User";
import Medium from "../../../../server/usecases/mongoose/Medium";
import Comment from "../../../../server/usecases/mongoose/Comment";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink";
import StarMediumLink from "../../../../server/usecases/mongoose/StarMediumLink";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";

const mutationResolver = createMutationResolver({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
}});

export default mutationResolver;