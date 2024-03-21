import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class ApplyJob {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async applyJob(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.useCase.applyJob(req.body);
      res
        .status(200)
        .json({ status: true, job, messsage: "Succesfull", id: job._id });
    } catch (error) {
      next(error);
    }
  }
}
