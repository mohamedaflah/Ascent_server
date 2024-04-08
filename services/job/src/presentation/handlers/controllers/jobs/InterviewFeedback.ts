import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";
import { Request, Response, NextFunction } from "express";
export class InterviewFeedback {
  private jobUseCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.jobUseCase = useCase;
  }

  async updateInterviewFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const applicant = await this.jobUseCase.updateInterviewFeedback(req.body);
      res.status(200).json({ status: true, applicant, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
