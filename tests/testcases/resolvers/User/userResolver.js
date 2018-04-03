import '../../../usecases/dependency';
import {createUserResolver} from "../../../../server/graphql/resolvers/User";
import User from "../../../../server/usecases/mongoose/User";
import Medium from "../../../../server/usecases/mongoose/Medium";
import FollowUserLink from "../../../../server/usecases/mongoose/FollowUserLink";
import Notification from "../../../../server/usecases/mongoose/Notification";

const userResolver = createUserResolver({dependency: {
    User,
    Medium,
    FollowUserLink,
    Notification,
  }});

export default userResolver;
