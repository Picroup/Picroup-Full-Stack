import SNS from 'aws-sdk/clients/sns';

const sns = new SNS({region: 'ap-northeast-1'});

export const sendVerifyCode = async ({phoneNumber, code}) => {
  const param = {
    Message: `【匹酷普】${code} 验证码`,
    MessageStructure: 'string',
    PhoneNumber: phoneNumber
  };

  return await sns.publish(param).promise();
};
