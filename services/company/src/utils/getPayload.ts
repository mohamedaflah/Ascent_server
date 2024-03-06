import jwt from "jsonwebtoken";
export const getPayload = (token: string):{id:string,role:"admin"|"user"|"company"} => {
  const payload = jwt.verify(token, process.env.JWT_KEY as string) as {id:string,role:"admin"|"user"|"company"} ;
  return payload;
};
