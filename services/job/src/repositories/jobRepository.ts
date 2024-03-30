import mongoose from "mongoose";
import { IJobRepository } from "../application/interfaces/repository_interface/IjobRepository";
import { Job } from "../domain/entities/JobEntity";
import jobModel from "../infra/databases/mongodb/models/jobModel";
import CategoryModel from "../infra/databases/mongodb/models/CategoryModel";
import { Applicant, JobFilterQuery } from "../util/types/applicantType";

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

    return addedJob[0];
  }
  async updateJob(body: Job, id: string): Promise<Job> {
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
  async getAllJob(
    page: number,
    pageSize: number,
    category?: string,
    employment?: string
  ): Promise<{ applicant: Job[]; totalPages: number }> {
    const totalCount = await jobModel.countDocuments({
      status: true,
      expired: false,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    const skip = (page - 1) * pageSize;
    console.log(category, " ****");
    console.log(employment, " ****");
    let matchConditions: JobFilterQuery = {
      status: true,
      expired: false,
    };
    
    if (category && category !== "null" && category.trim() !== "") {
      const categories = category
        .split(",")
        .filter((cat) => cat && cat !== "null" && cat.trim() !== "");
      if (categories.length > 0) {
        matchConditions.category = { $in: categories.map(value=>new mongoose.Types.ObjectId(value)) };
      }
    }

    if (employment && employment !== "null" && employment.trim() !== "") {
      const employments = employment
        .split(",")
        .filter((emp) => emp && emp !== "null" && emp.trim() !== "");
      if (employments.length > 0) {
        matchConditions.employment = { $in: employments };
      }
    }
    
    const jobs = await jobModel
      .aggregate([
        {
          $match: matchConditions,
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
      ])
      .skip(skip)
      .limit(pageSize);
console.log(matchConditions,' Cond');

    return { applicant: jobs, totalPages: totalPages };
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
  async getOneApplicant(jobId: string, applicantId: string): Promise<Job> {
    const applicantDetail = await jobModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(jobId),
          "applicants.applicantId": new mongoose.Types.ObjectId(applicantId),
        },
      },
      {
        $unwind: "$applicants",
      },
      {
        $match: {
          "applicants.applicantId": new mongoose.Types.ObjectId(applicantId),
        },
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
    const detail = applicantDetail[0] as unknown as Applicant;
    if (detail && detail.applicants && !detail.applicants?.applicationSeen) {
      await jobModel.updateOne(
        {
          _id: jobId,
          "applicants.applicantId": applicantId,
        },
        {
          $set: {
            "applicants.$.applicationSeen": true,
            "applicants.$.hiringstage": "Inreview",
          },
        }
      );

      return this.getOneApplicant(jobId, applicantId);
    }

    return applicantDetail[0];
  }
  async changeApplicationStatus(
    jobId: string,
    applicantId: string,
    status:
      | "Applied"
      | "Inreview"
      | "Shortlisted"
      | "Interview"
      | "Selected"
      | "Rejected",
    description: string,
    title: string,
    interviewDate: Date
  ): Promise<Job> {
    let applicant;
    if (status === "Interview") {
      await jobModel.findOneAndUpdate(
        {
          _id: jobId,
          "applicants.applicantId": applicantId,
        },
        {
          $set: {
            "applicants.$.hiringstage": status,
            "applicants.$.statusDescription.title": title,
            "applicants.$.statusDescription.description": description,
            "applicants.$.interviewDate": new Date(interviewDate),
          },
        }
      );
    } else {
      await jobModel.findOneAndUpdate(
        {
          _id: jobId,
          "applicants.applicantId": applicantId,
        },
        {
          $set: {
            "applicants.$.hiringstage": status,
            "applicants.$.statusDescription.title": title,
            "applicants.$.statusDescription.description": description,
          },
        }
      );
    }
    return this.getOneApplicant(jobId, applicantId);
  }
  async scheduleInterview(data: {
    jobId: string;
    applicantId: string;
    time: string;
    title: string;
  }): Promise<Job> {
    const interviewScheduleData = {
      title: data.title,
      time: data.time,
    };
    await jobModel.updateOne(
      {
        _id: data.jobId,
        "applicants.applicantId": data.applicantId,
      },
      {
        $push: {
          "applicants.$[outer].interviewSchedules": interviewScheduleData,
        },
      },
      {
        arrayFilters: [
          {
            "outer.applicantId": new mongoose.Types.ObjectId(data.applicantId),
          },
        ],
      }
    );
    return this.getOneApplicant(data.jobId, data.applicantId);
  }
}
