import mongoose, { mongo } from "mongoose";

const JobModel = new mongoose.Schema(
  {
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
    vacancies: { status: Boolean, available: Number, filled: Number },
    experince: Number,
    companyId: mongoose.Types.ObjectId,
    expiry: Date,
    completdJobAdd: {
      type: String,
      enum: ["first", "second"],
    },
    status: Boolean,
    expired: Boolean,
  },
  { timestamps: true }
);

// public readonly status?: boolean,
//     public readonly expired?: boolean
export default mongoose.model(process.env.JOB_MODEL as string, JobModel);
