import { CompanyUseCase } from "../../../../application/useCases/companyUseCase";
import { NextFunction, Request, Response } from "express";
export class AddCompany {
  private useCase: CompanyUseCase;
  constructor(useCase: CompanyUseCase) {
    this.useCase = useCase;
  }

  async addCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.useCase.addCompany(req.body);
      res.json({status:true,company})
    } catch (error) {
      next(error);
    }
  }
}
