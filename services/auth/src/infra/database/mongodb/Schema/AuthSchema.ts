import mongoose, { mongo } from "mongoose";

const AuthModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide lastname "],
    },
    lastname: {
      type: String,
      required: [true, "Please provide firstname"],
    },
    email: {
      type: String,
      required: [true, "Please Provide email"],
      unique:[true,'Email alrady taken!!'],
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
  { timestamps: true }
);

export default mongoose.model(String(process.env.AUTH_MODEL), AuthModel);
