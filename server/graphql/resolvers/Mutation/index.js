import {createRegisterResolver} from "./register";
import {createSaveImageMediumResolver} from "./saveImageMedium";
import {createFollowUserResolver} from "./followUser";
import {createUnfollowUserResolver} from "./unfollowUser";
import {createSaveCommentResolver} from "./saveComment";
import {createStarMediumResolver} from "./starMedium";
import {createRecommendMediumResolver} from "./recommendMedium";
import {createDeleteCommentResolver} from "./deleteComment";
import {createSaveUserFeedbackResolver} from "./saveUserFeedback";
import {createSaveMediumFeedbackResolver} from "./saveMediumFeedback";
import {createSaveAppFeedbackResolver} from "./saveAppFeedback";
import {createGetVerifyCodeResolver} from "./getVerifyCode";

export const createMutationResolver = ({dependency: {
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

  const saveUserFeedback = createSaveUserFeedbackResolver({dependency: {
      Feedback,
    }});

  const saveMediumFeedback = createSaveMediumFeedbackResolver({dependency: {
      Feedback,
    }});

  const saveAppFeedback = createSaveAppFeedbackResolver({dependency: {
      Feedback,
    }});

  const getVerifyCode = createGetVerifyCodeResolver({dependency: {
      VerifyCode,
    }});

  return {
    register,
    saveImageMedium,
    followUser,
    unfollowUser,
    saveComment,
    starMedium,
    recommendMedium,
    deleteComment,
    saveUserFeedback,
    saveMediumFeedback,
    saveAppFeedback,
    getVerifyCode,
  }
};