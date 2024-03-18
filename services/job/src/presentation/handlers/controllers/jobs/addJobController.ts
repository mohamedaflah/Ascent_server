import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class AddJob {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async addJob(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(`api called `);
        
      const job = await this.useCase.addJob(req.body);
      res.status(200).json({ status: true, job, messsage: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
