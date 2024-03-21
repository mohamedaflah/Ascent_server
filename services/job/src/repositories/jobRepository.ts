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
      status: true,
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
        $addFields: {
          categoryId: "$result._id",
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
    console.log("🚀 ~ JobRepository ~ updateJob ~ body:", body);
    let updateObj: any = { ...body };

    // Conditionally set the category if it's provided
    if (body.category) {
      updateObj.category = new mongoose.Types.ObjectId(body.category);
    }

    await jobModel.updateOne({ _id: id }, { $set: updateObj });
    const updatedJob = await jobModel.aggregate([
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
        $project: { result: 0 },
      },
    ]);
    if (updatedJob.length <= 0) throw new Error(" job not found");
    return updatedJob[0];
  }
  async getAllJob(limiit: number): Promise<Job[]> {
    const jobs = await jobModel.aggregate([
      {
        $match: { status: true },
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
        $project: { result: false },
      },
      {
        $sort: { createdAt: -1 },
      },
      // {
      //   $limit: limiit??0,
      // },
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
    console.log("🚀 ~ JobRepository ~ getAllJob ~ jobs:", jobs);
    // return await jobModel
    //   .find({ status: true })
    //   .limit(limiit)
    //   .sort({ createdAt: -1 });
    return jobs;
  }
  async deleteJob(id: string): Promise<Job> {
    const job = await jobModel.findById(id);
    if (!job) throw new Error("job not found");
    job.status = !job.status;
    await job.save();
    const deletedJob = await jobModel.aggregate([
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
    ]);
    if (deletedJob.length <= 0) throw new Error("Something went wrong");
    return deletedJob[0];
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
        $addFields: {
          categoryId: "$result._id",
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
          applicants: 0,
        },
      },
    ]);

    console.log(jobs);
    return jobs.map((value) => value);
  }
  async applyJob(body: {
    userId: string;
    jobId: string;
    resume: string;
  }): Promise<Job> {
    const job = await jobModel.findById(body.jobId);
    if (job?.vacancies?.available === job?.vacancies?.filled) {
      throw new Error(" Application full");
    }
    if (!job) throw new Error("job not found");
    job?.applicants.push({
      applicantId: new mongoose.Types.ObjectId(body.userId),
      appliedDate: new Date(),
      hiringstage: "Applied",
      resume: body.resume,
    });
    if (job.vacancies?.filled !== undefined) {
      job.vacancies.filled = (job.vacancies.filled ?? 0) + 1;
    }
    await job?.save();
    return job?.toObject();
  }
  async getAllApplicant(
    companyId: string,
    limit: number
  ): Promise<Job[] | any> {
    const applicants = await jobModel.aggregate([
      {
        $match: { companyId: new mongoose.Types.ObjectId(companyId) },
      },
      {
        $unwind: "$applicants",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $set: {
          category: "$categories.categoryname",
        },
      },
      {
        $addFields: {
          categoryId: "$categories.categoryId",
        },
      },
      {
        $project: { categories: 0 },
      },
      {
        $lookup: {
          from: "users",
          localField: "applicants.applicantId",
          foreignField: "_id",
          as: "applicantDetails",
        },
      },
      {
        $unwind: "$applicantDetails",
      },
    ]);
    console.log("🚀 ~ JobRepository ~ applicants:", applicants);
    return applicants;
  }
}
