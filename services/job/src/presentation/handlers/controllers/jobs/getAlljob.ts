import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetAllJob {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async getAlljob(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await this.useCase.getAllJob(Number(req.query.limit??0) );
      res
        .status(200)
        .json({ status: true, jobs, messsage: "Succesfull"});
    } catch (error) {
      next(error);
    }
  }
}
