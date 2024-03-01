import jwt from 'jsonwebtoken'
import { payload } from './types/otpSender';
export const getPaylaod = (token: string): payload => {
    const data: payload = jwt.verify(
      token,
      String(process.env.JWT_EMAIL_VALIDATION_KEY)
    ) as payload;
    return data;
  };