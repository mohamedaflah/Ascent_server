import mongoose from "mongoose";
const UserModel = new mongoose.Schema(
  {
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
    phonenumber: String,
    dateofbirth: Date,
    resume: String,
    skills: [String],
    personalsite: String,
    socialLink: [String],
    coverImage: String,
    icon: String,
    location: String,
    about: String,
    currengDesignation: String,
    education: [
      {
        image: String,
        university: String,
        course: String,
        year: { from: Date, to: Date },
        description: String,
      },
    ],
    experiences: [
      {
        title: String,
        description: String,
        image: String,
        location: String,
      },
    ],
    profileCompleted: Boolean,
    resumes: [String],
    stage: String,
  },
  { timestamps: true }
);

export default mongoose.model(String(process.env.USER_MODEL), UserModel);
