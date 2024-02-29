import jwt from "jsonwebtoken";
export const generateToken = (payload: {
  id: string;
  role: "user" | "admin" | "company";
}) => {
  try {
    // const expiration = Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60;
    const token = jwt.sign(payload, String(process.env.JWT_KEY), {
      expiresIn: "15d",
    });
    return token;
  } catch (error) {
    console.log(error + " JWt token generation");
  }
};
