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
      // validate: {
      //   validator: (value:string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value),
      //   message: 'Password must be at least 8 characters, contain at least one letter, one number, and one special character.',
      // },
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
