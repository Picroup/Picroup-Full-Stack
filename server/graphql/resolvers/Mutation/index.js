import {createRegisterResolver} from "./register";
import {createSaveImageMediumResolver} from "./saveImageMedium";
import {createFollowUserResolver} from "./followUser";
import {createUnfollowUserResolver} from "./unfollowUser";
import {createSaveCommentResolver} from "./saveComment";
import {createStarMediumResolver} from "./starMedium";
import {createRecommendMediumResolver} from "./recommendMedium";
import {createDeleteCommentResolver} from "./deleteComment";

export const createMutationResolver = ({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
  Notification,
  MediumRecommendLink,
}}) => {

  const register = createRegisterResolver({dependency: {
      User,
    }});

  const saveImageMedium = createSaveImageMediumResolver({dependency: {
      Medium,
      ReputationLink,
      User,
    }});

  const followUser = createFollowUserResolver({dependency: {
      FollowUserLink,
      User,
      ReputationLink,
      Notification,
    }});

  const unfollowUser = createUnfollowUserResolver({dependency: {
      FollowUserLink,
      User,
    }});

  const saveComment = createSaveCommentResolver({dependency: {
      Comment,
      Medium,
      Notification,
      User
    }});

  const starMedium = createStarMediumResolver({dependency: {
      StarMediumLink,
      Medium,
      ReputationLink,
      User,
      Notification
    }});

  const recommendMedium = createRecommendMediumResolver({dependency: {
      MediumRecommendLink,
    }});

  const deleteComment = createDeleteCommentResolver({dependency: {
      Comment,
      Medium,
    }});

  return {
    register,
    saveImageMedium,
    followUser,
    unfollowUser,
    saveComment,
    starMedium,
    recommendMedium,
    deleteComment
  }
};