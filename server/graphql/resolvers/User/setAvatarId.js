import {setById} from "../../../libraries/mongoose";


export const createSetAvatarIdResolver = ({dependency: {
  User
}}) => async ({_id}, { avatarId }) => {
  return await setById({
    Model: User,
    _id,
    value: { avatarId }
  })
};