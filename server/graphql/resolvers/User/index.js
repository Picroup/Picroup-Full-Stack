import {createFollowingsResolver} from "./followings";
import {createFollowersResolver} from "./followers";
import {createMediaResolver} from "./media";
import {createInterestedMediaResolver} from "./interestedMedia";
import {createStaredMediaResolver} from "./staredMedia";
import {createNotificationsResolver} from "./notifications";
import {createReputationLinksResolver} from "./reputationLinks";
import {createMarkNotificationsAsViewedResolver} from "./markNotificationsAsViewed";
import {createMarkReputationLinksAsViewedResolver} from "./markReputationLinksAsViewed";
import {createFollowedResolver} from "./followed";
import {createSetDisplayNameResolver} from "./setDisplayName";
import {createSetAvatarIdResolver} from "./setAvatarId";
import {createSetPasswordResolver} from "./setPassword";
import {createBlockingUsersResolver} from "./blockingUsers";

export const createUserResolver = ({dependency: {
  User,
  Medium,
  FollowUserLink,
  Notification,
  ReputationLink,
  StarMediumLink,
}}) => {

  const followings = createFollowingsResolver({dependency: {
      FollowUserLink,
      User
    }});

  const followers = createFollowersResolver({dependency: {
      FollowUserLink,
      User
    }});

  const media = createMediaResolver({dependency: {
      Medium,
      User
    }});

  const interestedMedia = createInterestedMediaResolver({dependency: {
      FollowUserLink,
      Medium,
      User,
    }});

  const staredMedia = createStaredMediaResolver({dependency: {
      StarMediumLink,
      Medium
    }});

  const notifications = createNotificationsResolver({dependency: {
      Notification
    }});

  const reputationLinks = createReputationLinksResolver({dependency: {
      ReputationLink
    }});

  const markNotificationsAsViewed = createMarkNotificationsAsViewedResolver({dependency: {
      Notification,
      User
    }});

  const markReputationLinksAsViewed = createMarkReputationLinksAsViewedResolver({dependency: {
      ReputationLink,
      User
    }});

  const followed = createFollowedResolver({dependency: {
      FollowUserLink
    }});

  const blockingUsers = createBlockingUsersResolver({dependency: {
      User
    }});

  const setDisplayName = createSetDisplayNameResolver({dependency: {
      User
    }});

  const setAvatarId = createSetAvatarIdResolver({dependency: {
      User
    }});

  const setPassword = createSetPasswordResolver({dependency: {
      User
    }});

  return {
    followings,
    followers,
    media,
    interestedMedia,
    staredMedia,
    notifications,
    reputationLinks,
    markNotificationsAsViewed,
    markReputationLinksAsViewed,
    followed,
    blockingUsers,
    setDisplayName,
    setAvatarId,
    setPassword,
  }
};