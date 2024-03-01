import jwt from "jsonwebtoken";
import { payload } from "../types/loginType";
export const generateEmailValidationToken = (payload: any) => {
  const token = jwt.sign(payload, String(process.env.JWT_EMAIL_VALIDATION_KEY));
  return token;
};

export const getPaylaod = (token: string): payload => {
  const data: payload = jwt.verify(
    token,
    String(process.env.JWT_EMAIL_VALIDATION_KEY)
  ) as payload;
  return data;
};
