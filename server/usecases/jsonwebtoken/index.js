import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../config";
import {oneMinute} from "../../libraries/date/index";

export const createVerifyPhoneToken = ({phoneNumber}) => {
  const info = {phoneNumber};
  return jwt.sign(info, JWT_SECRET, { expiresIn: 10 * oneMinute });
};

export const verifyPhoneToken = ({token}) => {
  return jwt.verify(token, JWT_SECRET)
};