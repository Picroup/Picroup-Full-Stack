import {createQueryResolver} from "./Query";
import {createMutationResolver} from "./Mutation";
import {createUserResolver} from "./User";
import {createMediumResolver} from "./Medium";
import {createCommentResolver} from "./Comment";
import {createReputationLinkResolver} from "./ReputationLink";
import {createNotificationResolver} from "./Notification";

export const createResolvers = ({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
  Notification,
}}) => {

  const queryResolver = createQueryResolver({dependency: {
      User,
      Medium
    }});

  const mutationResolver = createMutationResolver({dependency: {
      User,
      Medium,
      Comment,
      FollowUserLink,
      StarMediumLink,
      ReputationLink,
      Notification,
    }});

  const userResolver = createUserResolver({dependency: {
      User,
      Medium,
      FollowUserLink,
      Notification,
      ReputationLink,
      StarMediumLink,
    }});

  const mediumResolver = createMediumResolver({dependency: {
      Comment,
      StarMediumLink,
      User
    }});

  const commentResolver = createCommentResolver({dependency: {
      User,
    }});

  const reputationLinkResolver = createReputationLinkResolver({dependency: {
      User,
      Medium,
    }});

  const notificationResolver = createNotificationResolver({dependency: {
      User,
      Medium,
    }});

  return {
    Query: queryResolver,
    Mutation: mutationResolver,
    User: userResolver,
    Medium: mediumResolver,
    Comment: commentResolver,
    ReputationLink: reputationLinkResolver,
    Notification: notificationResolver,
  }
};