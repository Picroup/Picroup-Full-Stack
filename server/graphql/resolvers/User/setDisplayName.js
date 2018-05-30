import {setById} from "../../../libraries/mongoose";

export const createSetDisplayNameResolver = ({dependency: {
  User
}}) => async ({_id}, { displayName }) => {
  return await setById({
    Model: User,
    _id,
    value: { displayName }
  })
};

