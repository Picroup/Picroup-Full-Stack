import {createLoginResolver} from "./login";
import {createUserResolver} from "./user";
import {createRankedMediaResolver} from "./rankedMedia";
import {createMediumResolver} from "./medium";
import {createSearchUserResolver} from "./searchUser";
import {createHotMediaByTagsResolver, createHotMediaResolver} from "./hotMedia";
import {createSearchTagResolver} from "./searchTag";

export const createQueryResolver = ({dependency: {
  User,
  Medium,
  TagLink,
}}) => {

  const login = createLoginResolver({dependency: {
    User
  }});

  const user = createUserResolver({dependency: {
      User
    }});

  const rankedMedia = createRankedMediaResolver({dependency: {
      Medium
    }});

  const hotMedia = createHotMediaResolver({dependency: {
      Medium
    }});

  const hotMediaByTags = createHotMediaByTagsResolver({dependency: {
      Medium,
      User,
    }});

  const medium = createMediumResolver({dependency: {
      Medium
    }});

  const searchUser = createSearchUserResolver({dependency: {
      User
    }});

  const searchTag = createSearchTagResolver({dependency: {
      TagLink,
    }});

  return {
    login,
    user,
    rankedMedia,
    hotMediaByTags,
    hotMedia,
    medium,
    searchUser,
    searchTag,
  }
};