import '../../../usecases/dependency';
import {createUserResolver} from "../../../../server/graphql/resolvers/User";
import User from "../../../../server/usecases/mongoose/User";
import Medium from "../../../../server/usecases/mongoose/Medium";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink";
import Notification from "../../../../server/usecases/mongoose/Notification";
import ReputationLink from "../../../../server/usecases/mongoose/ReputationLink";

const userResolver = createUserResolver({dependency: {
    User,
    Medium,
    FollowUserLink,
    Notification,
    ReputationLink
  }});

export default userResolver;
