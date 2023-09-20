import crypto from 'crypto';

export const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey) 