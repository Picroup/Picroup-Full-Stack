/**
 * Created by Air on 2018/8/14.
 */

export const createSearchUserByPhoneNumberResolver = ({dependency: {
  User,
}}) => async (_, {phoneNumber}) => {
  return await User.findOne({phoneNumber})
};