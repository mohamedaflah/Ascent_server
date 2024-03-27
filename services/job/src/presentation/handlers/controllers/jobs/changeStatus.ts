import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";
import { sendInterviewMail } from "../../../../infra/messagebroker/kafka/producer/interviewSchedulePrd";
import { sendApplicationMail } from "../../../../infra/messagebroker/kafka/producer/sendApplicationMail";

export class ChangeApplicationStatus {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async changeApplicationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("came stats", req.body);

    try {
      const applicant = await this.useCase.changeApplicationStatus(
        req.params.jobId,
        req.params.applicantId,
        req.body.status,
        req.body.title,
        req.body.description,
        req.body.interviewDate
      );
      if (req.body.status === "Interview") {
        await sendInterviewMail({
          description: req.body.description,
          date: req.body.interviewDate,
          email: String(applicant.applicantDetails?.email),
        });
      } else {
        await sendApplicationMail({
          description: req.body.description,
          email: String(applicant.applicantDetails?.email),
          status: req.body.status,
          title: req.body.title,
        });
      }
      res.status(200).json({ status: true, applicant, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
