import mongoose from "mongoose";
const CompanyModel = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: String,
    password: String,
    description: String,
    contact: String,
    officeLocations: [
      {
        name: String,
        icon: String,
      },
    ],
    joinDate: Date,
    industry: String,
    images: [String],
    benefits: [
      {
        icon: String,
        headline: String,
        description: String,
      },
    ],
    foundedDate: Date,
    teams: [{ type: String, profile: String, designation: String }],
    techStack: [
      {
        name: String,
        icon: String,
      },
    ],
    website: String,
    coverImage: String,
    approvelStatus: {
      status: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending"],
      },
      description: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  process.env.COMPANY_MODEL as string,
  CompanyModel
);
