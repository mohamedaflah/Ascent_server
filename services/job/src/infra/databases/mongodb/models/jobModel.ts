import mongoose, { mongo } from "mongoose";

const JobModel = new mongoose.Schema({
  jobTitle: String,
  employment: String,
  description: String,
  category: mongoose.Types.ObjectId,
  joblocation: String,
  salaryrange: {
    status: Boolean,
    from: Number,
    to: Number,
  },
  experince: Number,
  companyId: mongoose.Types.ObjectId,
  expiry: Date,
  completdJobAdd: {
    type: String,
    enum: ["first", "second"],
  },
});

export default mongoose.model(process.env.JOB_MODEL as string, JobModel);
