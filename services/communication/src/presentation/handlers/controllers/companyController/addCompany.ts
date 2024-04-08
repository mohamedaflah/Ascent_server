import { ICompanyUseCase } from "../../../../application/interfaces/repo_interface/ICompanyUsecase";
import { NextFunction, Request, Response } from "express";
export class AddCompany {
  private companyUseCase: ICompanyUseCase;
  constructor(useCase: ICompanyUseCase) {
    this.companyUseCase = useCase;
  }
  async addCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.companyUseCase.addCompany(req.body);
      res.status(200).json({ status: true, company });
    } catch (error) {
      next(error);
    }
  }
}
