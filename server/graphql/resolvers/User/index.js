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
      Medium
    }});

  const interestedMedia = createInterestedMediaResolver({dependency: {
      FollowUserLink,
      Medium
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
  }
};