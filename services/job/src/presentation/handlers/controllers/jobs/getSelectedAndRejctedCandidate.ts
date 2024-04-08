import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

export class GetSelectedAndRejectedCandidates {
  private jobUseCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.jobUseCase = useCase;
  }
  async getCandidateisSelectedAndRejected(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const canidates =await this.jobUseCase.getSelectedAndRejectedCandidates(
        req.body.companyId
      );
      res.status(200).json({ status: true, message: "Succesfull", canidates });
    } catch (error) {
      next(error);
    }
  }
}
