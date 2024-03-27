import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";
import { sendInterviewMail } from "../../../../infra/messagebroker/kafka/producer/interviewSchedulePrd";

export class ScheduleInterview {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async sheduleInterview(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("__Calling___");

      const applicant = await this.useCase.scheduleInterview({
        jobId: req.params.jobId,
        applicantId: req.params.applicantId,
        time: req.body.time,
        title: req.body.title,
      });
      res.status(200).json({ status: true, applicant, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
