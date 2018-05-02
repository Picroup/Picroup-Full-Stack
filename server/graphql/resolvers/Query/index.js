import {createLoginResolver} from "./login";
import {createUserResolver} from "./user";
import {createRankedMediaResolver} from "./rankedMedia";
import {createMediumResolver} from "./medium";
import {createSearchUserResolver} from "./searchUser";

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
    medium,
    searchUser
  }
};