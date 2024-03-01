import mongoose from "mongoose";
import { isEmail } from "validator";

const OtpModel = new mongoose.Schema({
  email: String,
  otp: String,
  userData: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "company"],
    },
    blockStatus: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now(),
  },
});

export default mongoose.model(String(process.env.OTP_MODEL), OtpModel);
