import {comments} from "./comments";
import {stared} from "./stared";
import {user} from "./user";
import {recommendedMedia} from "./recommendedMedia";

export const createMediumResolver = ({dependency: {
  Comment,
  StarMediumLink,
  User,
  MediumRecommendLink,
  Medium,
}}) => ({

  comments: comments({dependency: {
      Comment,
    }}),

  stared: stared({dependency: {
      StarMediumLink,
    }}),

  user: user({dependency: {
      User,
    }}),

  recommendedMedia: recommendedMedia({dependency: {
      MediumRecommendLink,
      Medium,
    }}),
});