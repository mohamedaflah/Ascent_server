import mongoose from "mongoose";

const ApprovelModel = new mongoose.Schema({
  companyId: {
    type: mongoose.Types.ObjectId,
  },
});

export default mongoose.model(
  process.env.APPROVEL_MODEL as string,
  ApprovelModel
);
