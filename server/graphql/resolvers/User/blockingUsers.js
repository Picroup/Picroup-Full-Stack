import {modelsByIds} from "../../../libraries/mongoose";

export const createBlockingUsersResolver = ({dependency: {
  User
  }}) => async ({blockingUserIds}) => {
  return await modelsByIds(
    User,
    blockingUserIds,
  )
};