import {createLoginResolver} from "./login";
import {createUserResolver} from "./user";
import {createRankedMediaResolver} from "./rankedMedia";
import {createMediumResolver} from "./medium";
import {createSearchUserResolver} from "./searchUser";
import {createHotMediaByTagsResolver, createHotMediaResolver} from "./hotMedia";
import {createSearchTagResolver} from "./searchTag";
import {createSearchUserByPhoneNumberResolver} from "./searchUserByPhoneNumber";
import {createVerifyCodeResolver} from "./verifyCode";

export const createQueryResolver = ({dependency: {
  User,
  Medium,
  TagLink,
  VerifyCode,
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
      Medium,
    }});

  const searchUser = createSearchUserResolver({dependency: {
      User,
    }});

  const searchUserByPhoneNumber = createSearchUserByPhoneNumberResolver({dependency: {
    User,
  }});

  const searchTag = createSearchTagResolver({dependency: {
      TagLink,
    }});

  const verifyCode = createVerifyCodeResolver({dependency: {
    User,
    VerifyCode,
  }});

  return {
    login,
    user,
    rankedMedia,
    hotMediaByTags,
    hotMedia,
    medium,
    searchUser,
    searchUserByPhoneNumber,
    searchTag,
    verifyCode,
  }
};