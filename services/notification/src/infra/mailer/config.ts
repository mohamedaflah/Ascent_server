import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: String(process.env.ASCENT_OFFICIAL_MAIL),
    pass: String(process.env.ASCENT_SECRET_PASS),
  },
});
