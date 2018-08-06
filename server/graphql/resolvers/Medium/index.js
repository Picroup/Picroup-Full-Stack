import {createCommentsResolver} from "./comments";
import {createStaredResolver} from "./stared";
import {createUserResolver} from "./user";
import {createRecommendedMediaResolver} from "./recommendedMedia";
import {createAddTagResolver} from "./addTag";
import {createRemoveTagResolver} from "./removeTag";
import {createUrlResolver} from "./url";

export const createMediumResolver = ({dependency: {
  Comment,
  StarMediumLink,
  User,
  MediumRecommendLink,
  Medium,
  TagLink,
}}) => {

  const url = createUrlResolver({dependency: {

  }});

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
      User,
    }});

  const addTag = createAddTagResolver({dependency: {
      Medium,
      TagLink,
    }});

  const removeTag = createRemoveTagResolver({dependency: {
      Medium,
    }});

  return {
    url,
    comments,
    stared,
    user,
    recommendedMedia,
    addTag,
    removeTag,
  }
};