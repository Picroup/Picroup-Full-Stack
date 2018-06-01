import '../../../usecases/dependency';
import {createMutationResolver} from "../../../../server/graphql/resolvers/Mutation";
import User from "../../../../server/usecases/mongoose/User";
import Medium from "../../../../server/usecases/mongoose/Medium";
import Comment from "../../../../server/usecases/mongoose/Comment";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink";
import StarMediumLink from "../../../../server/usecases/mongoose/StarMediumLink";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";
import Notification from "../../../../server/usecases/mongoose/Notification";
import VerifyCode from "../../../../server/usecases/mongoose/VerifyCode";

const mutationResolver = createMutationResolver({dependency: {
    User,
    Medium,
    Comment,
    FollowUserLink,
    StarMediumLink,
    ReputationLink,
    Notification,
    VerifyCode,
  }});

export default mutationResolver;