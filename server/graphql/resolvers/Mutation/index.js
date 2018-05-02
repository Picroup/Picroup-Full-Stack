import {register} from "./register";
import {saveImageMedium} from "./saveImageMedium";
import {followUser} from "./followUser";
import {unfollowUser} from "./unfollowUser";
import {saveComment} from "./saveComment";
import {starMedium} from "./starMedium";
import {recommendMedium} from "./recommendMedium";

export const createMutationResolver = ({dependency: {
  User,
  Medium,
  Comment,
  FollowUserLink,
  StarMediumLink,
  ReputationLink,
  Notification,
  MediumRecommendLink,
}}) => ({

  register: register({dependency: {
      User,
    }}),

  saveImageMedium: saveImageMedium({dependency: {
      Medium,
      ReputationLink,
      User,
    }}),

  followUser: followUser({dependency: {
      FollowUserLink,
      User,
      ReputationLink,
      Notification,
    }}),

  unfollowUser: unfollowUser({dependency: {
      FollowUserLink,
      User,
    }}),

  saveComment: saveComment({dependency: {
      Comment,
      Medium,
      Notification,
      User
    }}),

  starMedium: starMedium({dependency: {
      StarMediumLink,
      Medium,
      ReputationLink,
      User,
      Notification
    }}),

  recommendMedium: recommendMedium({dependency: {
      MediumRecommendLink
    }}),
});