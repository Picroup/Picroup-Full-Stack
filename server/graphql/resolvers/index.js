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
  MediumRecommendLink,
  Feedback,
}}) => {

  const query = createQueryResolver({dependency: {
      User,
      Medium,
    }});

  const mutation = createMutationResolver({dependency: {
      User,
      Medium,
      Comment,
      FollowUserLink,
      StarMediumLink,
      ReputationLink,
      Notification,
      MediumRecommendLink,
      Feedback,
    }});

  const user = createUserResolver({dependency: {
      User,
      Medium,
      FollowUserLink,
      Notification,
      ReputationLink,
      StarMediumLink,
    }});

  const medium = createMediumResolver({dependency: {
      Comment,
      StarMediumLink,
      User,
      MediumRecommendLink,
      Medium,
    }});

  const comment = createCommentResolver({dependency: {
      User,
    }});

  const reputationLink = createReputationLinkResolver({dependency: {
      User,
      Medium,
    }});

  const notification = createNotificationResolver({dependency: {
      User,
      Medium,
    }});

  return {
    Query: query,
    Mutation: mutation,
    User: user,
    Medium: medium,
    Comment: comment,
    ReputationLink: reputationLink,
    Notification: notification,
  }
};