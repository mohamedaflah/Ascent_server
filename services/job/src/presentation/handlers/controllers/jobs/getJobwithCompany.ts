import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetJobsWithCompany {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async getJobsWithCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await this.useCase.getJobsWithCompany(req.params.companyId);
      res
        .status(200)
        .json({ status: true, jobs, messsage: "Succesfull",});
    } catch (error) {
      next(error);
    }
  }
}
