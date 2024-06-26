import { Job } from "../../../domain/entities/JobEntity";
import { Applicant } from "../../../util/types/applicantType";

export interface IJobRepository {
  addJob(body: Job): Promise<Job>;
  updateJob(body: Job, id: string): Promise<Job>;
  getAllJob(
    page: number,
    pageSize: number,
    category?: string,
    employment?: string,
    search?: string,
    skills?:string,
    location?: string
  ): Promise<{ applicant: Job[]; totalPages: number }>;
  deleteJob(id: string): Promise<Job>;
  getSpecificJob(id: string): Promise<Job>;
  getJobsWithCompany(companyId: string): Promise<Job[]>;
  applyJob(body: {
    userId: string;
    jobId: string;
    resume: string;
  }): Promise<Job>;
  getAllApplicant(companyId: string, limit: number): Promise<Job[] | any>;
  getOneApplicant(jobId: string, applicantId: string): Promise<Job>;
  changeApplicationStatus(
    jobId: string,
    applicantId: string,
    status: string,
    description: string,
    title: string,
    interviewDate: Date
  ): Promise<Job>;
  scheduleInterview(data: {
    jobId: string;
    applicantId: string;
    time: string;
    title: string;
  }): Promise<Job>;
  getSelectedAndRejectedCandidates(companyId: string): Promise<Applicant[]>;
  updateInterviewFeedback(data: {
    jobId: string;
    applicantId: string;
    interivewId: string;
    feedbackDescription: string;
    feedback: string;
  }): Promise<Applicant>;
  getApplication(userId:string): Promise<Job[]>;
}
