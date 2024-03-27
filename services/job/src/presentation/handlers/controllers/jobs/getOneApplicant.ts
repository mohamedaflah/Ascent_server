import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetOneApplicant {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async getOneApplicant(req: Request, res: Response, next: NextFunction) {
    try {
     console.log('__Calling___');
     
      
      const applicant = await this.useCase.getOneApplicant(req.params.jobId,req.params.applicantId);
      res
        .status(200)
        .json({ status: true, applicant, messsage: "Succesfull",});
    } catch (error) {
      next(error);
    }
  }
}
