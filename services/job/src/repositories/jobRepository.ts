import mongoose from "mongoose";
import { IJobRepository } from "../application/interfaces/repository_interface/IjobRepository";
import { Job } from "../domain/entities/JobEntity";
import jobModel from "../infra/databases/mongodb/models/jobModel";
import CategoryModel from "../infra/databases/mongodb/models/CategoryModel";

export class JobRepository implements IJobRepository {
  async addJob(body: Job): Promise<Job> {
    const newJob = await jobModel.create({
      ...body,
      companyId: new mongoose.Types.ObjectId(body.companyId),
      category: new mongoose.Types.ObjectId(body.category),
      expired: false,
    });
    const addedJob = await jobModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(newJob._id) },
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
        $project: { result: 0 },
      },
    ]);
    console.log("🚀 ~ JobRepository ~ addJob ~ addedJob:", addedJob);

    return addedJob[0];
  }
  async updateJob(body: Job, id: string): Promise<Job> {
    await jobModel.updateOne({ _id: id }, { $set: body });
    const updatedJob = await jobModel.findOne({ _id: id });
    if (!updatedJob) throw new Error(" job not found");
    return updatedJob?.toObject();
  }
  async getAllJob(limiit: number): Promise<Job[] | any[]> {
    return await jobModel
      .find({ status: true })
      .limit(limiit)
      .sort({ createdAt: -1 });
  }
  async deleteJob(id: string): Promise<Job> {
    const job = await jobModel.findById(id);
    if (!job) throw new Error("job not found");
    job.status = !job.status;
    await job.save();
    return job.toObject();
  }
  async getSpecificJob(id: string): Promise<Job> {
    const job = await jobModel.findById(id);
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
        $project: {
          result: 0,
        },
      },
    ]);
    console.log("🚀 ~ JobRepository ~ addJob ~ addedJob:", addedJob);
    if (!job) throw new Error("job not found");
    return addedJob[0];
  }
  async getJobsWithCompany(companyId: string): Promise<Job[]> {
    const jobs = await jobModel.aggregate([
      {
        $match: { companyId: new mongoose.Types.ObjectId(companyId) },
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
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          result: 0,
        },
      },
    ]);

    console.log(jobs);
    return jobs.map((value) => value);
  }
}
