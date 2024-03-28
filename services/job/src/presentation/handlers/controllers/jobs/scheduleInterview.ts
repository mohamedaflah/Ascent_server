import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";
import { sendInterviewMail } from "../../../../infra/messagebroker/kafka/producer/interviewSchedulePrd";
import { format } from "date-fns";
import { convertTimeToAMPM } from "../../../../util/convertTimer";
export class ScheduleInterview {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async sheduleInterview(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("__Calling___");

      const applicant: any = await this.useCase.scheduleInterview({
        jobId: req.params.jobId,
        applicantId: req.params.applicantId,
        time: req.body.time,
        title: req.body.title,
      });
      console.log(req.body, " 🎈🎈🎈 ");

      await sendInterviewMail({
        description: `<div style="display:flex;flex-direction:column"><h2 style="text:start">${
          req.body.title
        }</h2> <h4>${format(
          applicant.applicants.interviewDate,
          "PPP"
        )} at ${convertTimeToAMPM(req.body.time)}</h4> </div>`,
        date: req.body.time,
        email: String(applicant.applicantDetails?.email),
        from: "time",
      });
      res.status(200).json({ status: true, applicant, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
