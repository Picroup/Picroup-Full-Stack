import crypto from 'crypto';

export const createSaltedPassword = (password) => crypto
  .createHash('sha256')
  .update(`${password}picroup`)
  .digest('hex');