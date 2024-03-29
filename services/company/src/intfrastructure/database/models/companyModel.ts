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
    // officeLocations: [
    //   {
    //     name: String,
    //     icon: String,
    //   },
    // ],
    locations: [String],
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
    techStack: [String],
    // techStack: [
    //   {
    //     name: String,
    //     icon: String,
    //   },
    // ],
    website: String,
    coverImage: String,
    icon: String,
    approvelStatus: {
      status: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending","Message"],
      },
      description: String,
    },
    profileCompleted: Boolean,
    profileCompletionStatus: {
      type: String,
      enum: ["1%", "2%", "3%"],
    },
    socialLinks: {
      type: [String],
    },
    LinkedInLink: String,
    certificate: String,
    registrationId: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  process.env.COMPANY_MODEL as string,
  CompanyModel
);
