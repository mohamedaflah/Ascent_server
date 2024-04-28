// /application/:userId
import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetMyApplication {
  private useCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }
  async getOneApplicant(req: Request, res: Response, next: NextFunction) {
    try {
     
      const applicant = await this.useCase.getApplication(req.params.userId);
      res
        .status(200)
        .json({ status: true, applicant, messsage: "Succesfull",});
    } catch (error) {
      next(error);
    }
  }
}
