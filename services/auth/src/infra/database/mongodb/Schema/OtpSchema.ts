import mongoose from "mongoose";
import { isEmail } from "validator";

const OtpModel = new mongoose.Schema({
  email: String,
  otp: String,
  userData: {
    firstname: {
      type: String,
      required: [true, "Please provide firstname "],
    },
    lastname: {
      type: String,
      required: [true, "Please provide lastname"],
    },
    email: {
      type: String,
      unique: [true, "Email alrady taken!!"],
      required: [true, "Please Provide email"],
      validate: {
        validator: isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "provide password"],
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
