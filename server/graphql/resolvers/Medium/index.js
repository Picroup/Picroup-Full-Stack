import {createCommentsResolver} from "./comments";
import {createStaredResolver} from "./stared";
import {createUserResolver} from "./user";
import {createRecommendedMediaResolver} from "./recommendedMedia";

export const createMediumResolver = ({dependency: {
  Comment,
  StarMediumLink,
  User,
  MediumRecommendLink,
  Medium,
}}) => {

  const comments = createCommentsResolver({dependency: {
      Comment,
    }});

  const stared = createStaredResolver({dependency: {
      StarMediumLink,
    }});

  const user = createUserResolver({dependency: {
      User,
    }});

  const recommendedMedia = createRecommendedMediaResolver({dependency: {
      MediumRecommendLink,
      Medium,
    }});

  return {
    comments,
    stared,
    user,
    recommendedMedia,
  }
};