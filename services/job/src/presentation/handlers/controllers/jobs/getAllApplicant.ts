import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetAllApplicant {
  private usecase: IUseCase;
  constructor(useCase: IUseCase) {
    this.usecase = useCase;
  }

  async getAllApplicant(req: Request, res: Response, next: NextFunction) {
    try {
      const applicants = await this.usecase.getAllApplicant(
        req.params.companyId,
        Number(req.query.limit || 0)
      );
      res.json({ status: true, applicants,message:"Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
