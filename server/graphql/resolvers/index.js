import {createQueryResolver} from "./Query";
import {createMutationResolver} from "./Mutation";
import {createUserResolver} from "./User";
import {createMediumResolver} from "./Medium";
import {createCommentResolver} from "./Comment";

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
    }});

  const mediumResolver = createMediumResolver({dependency: {
      Comment,
      StarMediumLink,
      User
    }});

  const commentResolver = createCommentResolver({dependency: {
      User,
    }});

  return {
    Query: queryResolver,
    Mutation: mutationResolver,
    User: userResolver,
    Medium: mediumResolver,
    Comment: commentResolver
  }
};