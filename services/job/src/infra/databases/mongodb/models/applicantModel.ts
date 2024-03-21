import mongoose from "mongoose";

const ApplicantModel = new mongoose.Schema(
  {
    categoryname: {
      type: String,
      required: [true, "Category name is required"],
      unique:[true,"Category name mustbe unique"]
    },
    categoryDescription: {
      type: String,
      required: [true, "Category description is required"],
    },
    categoryImage: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  process.env.APPLICANT_MODEL as string,
  ApplicantModel
);
