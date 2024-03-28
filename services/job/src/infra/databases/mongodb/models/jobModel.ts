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
    experience: Number,
    responsibilities: String,
    completdJobAdd: {
      type: String,
      enum: ["first", "second"],
    },
    skills: [String],
    qualification: [String],
    status: Boolean,
    expired: Boolean,
    applicants: [
      {
        applicantId: mongoose.Types.ObjectId,
        appliedDate: Date,
        hiringstage: {
          type: String,
          enum: [
            "Applied",
            "Inreview",
            "Shortlisted",
            "Interview",
            "Rejected",
            "Selected",
          ],
        },
        interviewDate: Date,
        statusDescription: {
          title: String,
          description: String,
          joiningDate: Date,
        },
        resume: String,
        applicationSeen: {
          type: Boolean,
          default: false,
        },
        interviewSchedules: [
          {
            title: String,
            time: String,
            status: {
              type: String,
              enum: ["Pending", "Completed"],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// public readonly status?: boolean,
//     public readonly expired?: boolean
export default mongoose.model(process.env.JOB_MODEL as string, JobModel);
