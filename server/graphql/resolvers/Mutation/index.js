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
import {createDeleteMediumResolver} from "./deleteMedium";

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

  const getVerifyCode = createGetVerifyCodeResolver({dependency: {
      VerifyCode,
    }});

  const register = createRegisterResolver({dependency: {
      User,
      VerifyCode,
    }});

  const saveImageMedium = createSaveImageMediumResolver({dependency: {
      Medium,
      ReputationLink,
      User,
    }});

  const saveComment = createSaveCommentResolver({dependency: {
      Comment,
      Medium,
      Notification,
      User
    }});

  const saveUserFeedback = createSaveUserFeedbackResolver({dependency: {
      Feedback,
    }});

  const saveMediumFeedback = createSaveMediumFeedbackResolver({dependency: {
      Feedback,
    }});

  const saveCommentFeedback = createSaveCommentResolver({dependency: {
      Feedback,
    }});

  const saveAppFeedback = createSaveAppFeedbackResolver({dependency: {
      Feedback,
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

  const deleteMedium = createDeleteMediumResolver({dependency: {
      StarMediumLink,
      MediumRecommendLink,
      Comment,
      Medium,
    }});

  return {
    getVerifyCode,
    register,
    saveImageMedium,
    saveComment,
    saveUserFeedback,
    saveMediumFeedback,
    saveCommentFeedback,
    saveAppFeedback,
    followUser,
    unfollowUser,
    starMedium,
    recommendMedium,
    deleteComment,
    deleteMedium,
  }
};