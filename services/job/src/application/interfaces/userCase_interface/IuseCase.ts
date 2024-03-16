import { Job } from "../../../domain/entities/JobEntity";

export interface IUseCase {
  addJob(body: Job): Promise<Job>;
  updateJob(body: Job): Promise<Job>;
  getAllJob(limiit: number): Promise<Job[]>;
  deleteJob(id: string): Promise<Job>;
  getSpecificJob(id: string): Promise<Job>;
}
