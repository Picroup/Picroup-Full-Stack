import {createQueryResolver} from "./Query";
import {createMutationResolver} from "./Mutation";
import {createUserResolver} from "./User";
import {createMediumResolver} from "./Medium";

export const createResolvers = ({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
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
    }});

  const userResolver = createUserResolver({dependency: {
      User,
      Medium,
      FollowUserLink,
    }});

  const mediumResolver = createMediumResolver({dependency: {
      Comment,
      StarMediumLink
    }});

  return {
    Query: queryResolver,
    Mutation: mutationResolver,
    User: userResolver,
    Medium: mediumResolver
  }
};