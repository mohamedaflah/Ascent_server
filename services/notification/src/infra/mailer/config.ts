import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: String(process.env.ASCENT_OFFICIAL_MAIL),
    pass: String(process.env.ASCENT_SECRET_PASS),
  },
  tls: {
    rejectUnauthorized: false,
  },
});
