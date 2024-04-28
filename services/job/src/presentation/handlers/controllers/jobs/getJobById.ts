import { NextFunction, Request, Response } from "express";
import jobModel from "../../../../infra/databases/mongodb/models/jobModel";
import mongoose from "mongoose";

export const getJobByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobIds }: { jobIds: string[] } = req.body;
    console.log(req.body);
    
    let jobs: any[] = []; // Initialize an empty array to store job details

    // Map jobIds to an array of promises
    const promises = jobIds?.map(async (id) => {
      const addedJob = await jobModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $set: {
            category: "$result.categoryname",
          },
        },
        {
          $addFields: {
            categoryId: "$result._id",
          },
        },
        {
          $project: {
            result: 0,
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $unwind: "$company",
        },
      ]);
      // Push the first element of addedJob array to jobs array
      jobs.push(addedJob[0]);
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    console.log(jobs, " Jobs");
    res.status(200).json({ status: true, message: "Successful", jobs });
  } catch (error) {
    next(error);
  }
};
