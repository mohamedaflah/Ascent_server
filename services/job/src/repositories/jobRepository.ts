import { IJobRepository } from "../application/interfaces/repository_interface/IjobRepository";
import { Job } from "../domain/entities/JobEntity";
import jobModel from "../infra/databases/mongodb/models/jobModel";

export class JobRepository implements IJobRepository {
  async addJob(body: Job): Promise<Job> {
    const newJob = await jobModel.create(body);
    return newJob.toObject();
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
    if (!job) throw new Error("job not found");
    return job.toObject();
  }
}
