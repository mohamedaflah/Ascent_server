import { Job } from "../../domain/entities/JobEntity";
import { IJobRepository } from "../interfaces/repository_interface/IjobRepository";
import { IUseCase } from "../interfaces/userCase_interface/IuseCase";

export class JobUseCase implements IUseCase {
  private repository: IJobRepository;
  constructor(repo: IJobRepository) {
    this.repository = repo;
  }
  async addJob(body: Job): Promise<Job> {
    return await this.repository.addJob(body);
  }
  async updateJob(body: Job, id: string): Promise<Job> {
    return await this.repository.updateJob(body, id);
  }
  async getAllJob(limiit: number): Promise<Job[]> {
    return await this.repository.getAllJob(limiit);
  }
  async deleteJob(id: string): Promise<Job> {
    return await this.repository.deleteJob(id);
  }
  async getSpecificJob(id: string): Promise<Job> {
    return await this.repository.getSpecificJob(id);
  }
}
