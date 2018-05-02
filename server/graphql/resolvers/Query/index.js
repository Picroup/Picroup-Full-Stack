import {createLoginResolver} from "./login";
import {createUserResolver} from "./user";
import {createRankedMediaResolver} from "./rankedMedia";
import {createMediumResolver} from "./medium";

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

  return {
  login,
  user,
  rankedMedia,
  medium,
}};