import mongoose from "mongoose";


const linkModel = new mongoose.Schema({
  email: String,
  link: String,
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now(),
  },
});

export default mongoose.model(String(process.env.VERIFICIATION_LINK), linkModel);
