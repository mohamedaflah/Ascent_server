import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class UpdateJob {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.useCase.updateJob(req.body, req.params.id);
      res
        .status(200)
        .json({ status: true, job, messsage: "Succesfull", id: job._id });
    } catch (error) {
      next(error);
    }
  }
}
