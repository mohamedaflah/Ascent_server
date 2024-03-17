import { Router } from "express";
import { JobRepository } from "../../../repositories/jobRepository";
import { JobUseCase } from "../../../application/useCases/jobUseCase";
import { AddJob } from "../controllers/addJobController";
import { UpdateJob } from "../controllers/updateJobController";
import { DeleteJob } from "../controllers/deleteJob";
import { GetAllJob } from "../controllers/getAlljob";
import { GetSpecificJob } from "../controllers/getSpecificjobController";

const router = Router();

const repository = new JobRepository();
const useCase = new JobUseCase(repository);

const addJobController = new AddJob(useCase);
const updateJobController = new UpdateJob(useCase);
const deleteJobController = new DeleteJob(useCase);
const getAllJobController = new GetAllJob(useCase);
const getSpecificjobController = new GetSpecificJob(useCase);
router
  .route("/job")
  .post(addJobController.addJob.bind(addJobController))
  .get(getAllJobController.getAlljob.bind(getAllJobController));

router
  .route("/job/:id")
  .post(updateJobController.updateJob.bind(updateJobController))
  .get(getSpecificjobController.getSpecificjob.bind(getSpecificjobController))
  .get(deleteJobController.deleteJob.bind(deleteJobController));

export default router;
