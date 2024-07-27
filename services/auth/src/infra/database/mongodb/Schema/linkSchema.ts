import mongoose from "mongoose";

const linkModel = new mongoose.Schema({
  email: String,
  link: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, //Expire in 5 minute
  },
});

export default mongoose.models[String(process.env.VERIFICIATION_LINK)] ||
  mongoose.model(String(process.env.VERIFICIATION_LINK), linkModel);
