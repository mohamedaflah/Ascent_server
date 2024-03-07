import { NextFunction, Request, Response } from "express";
import { ICompanyInteractor } from "../../interfaces/interactor_interface/ICompanyInteractor";
import { getPayload } from "../../utils/getPayload";
import { rejectMailProducer } from "../../intfrastructure/messagebrokers/kafka/producers/rejectMailProducer";

export class CompanyController {
  private companyInteractor: ICompanyInteractor;
  constructor(interactor: ICompanyInteractor) {
    this.companyInteractor = interactor;
  }

  async getCompanyData(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Called (()()');
      
      const data = getPayload(req.cookies?.access_token);
      const company = await this.companyInteractor.getCompany(data.id);

      res
        .status(200)
        .json({ status: true, message: "Successfull!!", user: company,role:"company",approvelStatus:company.approvelStatus?.status });
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body,' Body');
      const { id, status, description } = req.body;
      const company = await this.companyInteractor.changeStatus(
        id.trim(),
        status,
        description
      );
      if (status === "Rejected") {
        await rejectMailProducer(company.email, description);
      }
      res
        .status(200)
        .json({
          status: true,
          message: "Success",
          user: company,
          role: "company",
        });
    } catch (error) {
      next(error);
    }
  }

  async getApprovelCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const companies=await this.companyInteractor.getApprovelCompanies()
      res.status(200).json({status:true,role:"company",companies})
    } catch (error) {
      next(error);
    }
  }

  
}
