import {setByKey} from "../../../libraries/mongoose";

export const createSetDisplayNameResolver = ({dependency: {
  User
}}) => async ({_id}, { displayName }) => {
  return await setByKey({
    Model: User,
    _id,
    value: { displayName }
  })
};
