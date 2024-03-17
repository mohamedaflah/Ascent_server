import { Job } from "../../../domain/entities/JobEntity";

export interface IJobRepository {
  addJob(body: Job): Promise<Job>;
  updateJob(body: Job,id:string): Promise<Job>;
  getAllJob(limiit: number): Promise<Job[]>;
  deleteJob(id: string): Promise<Job>;
  getSpecificJob(id: string): Promise<Job>;
}
