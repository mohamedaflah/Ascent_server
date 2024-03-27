import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

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
    console.log('came stats',req.body);
    
    try {
      const applicant = await this.useCase.changeApplicationStatus(
        req.params.jobId,
        req.params.applicantId,
        req.body.status,
        req.body.title,
        req.body.description,
        req.body.interviewDate
      );
      res.status(200).json({ status: true, applicant, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
