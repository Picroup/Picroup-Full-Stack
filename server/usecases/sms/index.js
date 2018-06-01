import SMSClient from '@alicloud/sms-sdk';
import {ALICLOUD_ACCESS_KEY, ALICLOUD_SECRET_Key, ALICLOUD_TEMPLATE_CODE} from "../../config";

const accessKeyId = ALICLOUD_ACCESS_KEY;
const secretAccessKey = ALICLOUD_SECRET_Key;
const TemplateCode = ALICLOUD_TEMPLATE_CODE;

let smsClient = new SMSClient({accessKeyId, secretAccessKey});

export const sendVerifyCode = async ({phoneNumber, code}) => {

  const param = {
    PhoneNumbers: phoneNumber,
    SignName: '匹酷普',
    TemplateCode: TemplateCode,
    TemplateParam: `{"code":"${code}"}`
  };

  return await smsClient.sendSMS(param);
};
