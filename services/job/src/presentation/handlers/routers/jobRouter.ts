import { Router } from "express";
import { JobRepository } from "../../../repositories/jobRepository";
import { JobUseCase } from "../../../application/useCases/jobUseCase";
import { AddJob } from "../controllers/jobs/addJobController";
import { UpdateJob } from "../controllers/jobs/updateJobController";
import { DeleteJob } from "../controllers/jobs/deleteJob";
import { GetAllJob } from "../controllers/jobs/getAlljob";
import { GetSpecificJob } from "../controllers/jobs/getSpecificjobController";
import { GetJobsWithCompany } from "../controllers/jobs/getJobwithCompany";
import { ApplyJob } from "../controllers/jobs/applyJob";
import { GetAllApplicant } from "../controllers/jobs/getAllApplicant";
import { GetOneApplicant } from "../controllers/jobs/getOneApplicant";
import { ChangeApplicationStatus } from "../controllers/jobs/changeStatus";
import { ScheduleInterview } from "../controllers/jobs/scheduleInterview";

const router = Router();

const repository = new JobRepository();
const useCase = new JobUseCase(repository);

const addJobController = new AddJob(useCase);
const updateJobController = new UpdateJob(useCase);
const deleteJobController = new DeleteJob(useCase);
const getAllJobController = new GetAllJob(useCase);
const getSpecificjobController = new GetSpecificJob(useCase);
const companyJobsController = new GetJobsWithCompany(useCase);
const applyJob = new ApplyJob(useCase);
const getAllApplicant = new GetAllApplicant(useCase);
const getSpecific = new GetOneApplicant(useCase);
const changeApplicationStatus = new ChangeApplicationStatus(useCase);
const schedulingInterview = new ScheduleInterview(useCase);
router
  .route("/job")
  .post(addJobController.addJob.bind(addJobController))
  .get(getAllJobController.getAlljob.bind(getAllJobController));

router
  .route("/job/:id")
  .patch(updateJobController.updateJob.bind(updateJobController))
  .get(getSpecificjobController.getSpecificjob.bind(getSpecificjobController))
  .put(deleteJobController.deleteJob.bind(deleteJobController));
router.get(
  "/get-jobs/:companyId",
  companyJobsController.getJobsWithCompany.bind(companyJobsController)
);
router.route("/applicants").post(applyJob.applyJob.bind(applyJob));
router.get(
  "/applicants/:companyId",
  getAllApplicant.getAllApplicant.bind(getAllApplicant)
);
router
  .route("/applicants/:jobId/:applicantId")
  .get(getSpecific.getOneApplicant.bind(getSpecific))
  .put(
    changeApplicationStatus.changeApplicationStatus.bind(
      changeApplicationStatus
    )
  )
  .patch(schedulingInterview.sheduleInterview.bind(schedulingInterview));

export default router;
