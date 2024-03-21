import { Job } from "../../../domain/entities/JobEntity";

export interface IUseCase {
  addJob(body: Job): Promise<Job>;
  updateJob(body: Job, id: string): Promise<Job>;
  getAllJob(limiit: number): Promise<Job[]>;
  deleteJob(id: string): Promise<Job>;
  getSpecificJob(id: string): Promise<Job>;
  getJobsWithCompany(companyId: string): Promise<Job[]>;
  applyJob(body:{userId: string,jobId:string,resume:string}): Promise<Job>;
  getAllApplicant(companyId: string, limit: number): Promise<Job[]|any>;
}
