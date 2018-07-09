import {createLoginResolver} from "./login";
import {createUserResolver} from "./user";
import {createRankedMediaResolver} from "./rankedMedia";
import {createMediumResolver} from "./medium";
import {createSearchUserResolver} from "./searchUser";
import {createHotMediaByTagResolver, createHotMediaResolver} from "./hotMedia";

export const createQueryResolver = ({dependency: {
  User,
  Medium,
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

  const hotMediaByTag = createHotMediaByTagResolver({dependency: {
      Medium
    }});

  const medium = createMediumResolver({dependency: {
      Medium
    }});

  const searchUser = createSearchUserResolver({dependency: {
      User
    }});

  return {
    login,
    user,
    rankedMedia,
    hotMediaByTag,
    hotMedia,
    medium,
    searchUser
  }
};