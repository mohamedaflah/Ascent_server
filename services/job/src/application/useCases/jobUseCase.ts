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
  async getAllJob(
    page: number,
    pageSize: number,
    category?: string,
    employment?: string,
    search?: string
  ): Promise<{ applicant: Job[]; totalPages: number }> {
    return await this.repository.getAllJob(
      page,
      pageSize,
      category,
      employment,
      search
    );
  }
  async deleteJob(id: string): Promise<Job> {
    return await this.repository.deleteJob(id);
  }
  async getSpecificJob(id: string): Promise<Job> {
    return await this.repository.getSpecificJob(id);
  }
  async getJobsWithCompany(companyId: string): Promise<Job[]> {
    return await this.repository.getJobsWithCompany(companyId);
  }
  async applyJob(body: {
    userId: string;
    jobId: string;
    resume: string;
  }): Promise<Job> {
    return await this.repository.applyJob(body);
  }
  async getAllApplicant(companyId: string, limit: number): Promise<any> {
    return await this.repository.getAllApplicant(companyId, limit);
  }
  async getOneApplicant(jobId: string, applicantId: string): Promise<Job> {
    return await this.repository.getOneApplicant(jobId, applicantId);
  }
  async changeApplicationStatus(
    jobId: string,
    applicantId: string,
    status: string,
    description: string,
    title: string,
    interviewDate: Date
  ): Promise<Job> {
    return await this.repository.changeApplicationStatus(
      jobId,
      applicantId,
      status,
      description,
      title,
      interviewDate
    );
  }
  async scheduleInterview(data: {
    jobId: string;
    applicantId: string;
    time: string;
    title: string;
  }): Promise<Job> {
    return await this.repository.scheduleInterview(data);
  }
}
