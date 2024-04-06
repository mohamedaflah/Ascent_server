import e, { NextFunction, Request, Response } from "express";
import { ICompanyInteractor } from "../../interfaces/interactor_interface/ICompanyInteractor";
import { getPayload } from "../../utils/getPayload";
import { rejectMailProducer } from "../../intfrastructure/messagebrokers/kafka/producers/rejectMailProducer";
import { addCompanyProducer } from "../../intfrastructure/messagebrokers/kafka/producers/addCompanyProducer";

export class CompanyController {
  private companyInteractor: ICompanyInteractor;
  constructor(interactor: ICompanyInteractor) {
    this.companyInteractor = interactor;
  }

  async getCompanyData(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Called (()()");

      const data = getPayload(req.cookies?.access_token);
      const company = await this.companyInteractor.getCompany(data.id);

      res.status(200).json({
        status: true,
        message: "Successfull!!",
        user: company,
        role: "company",
        approvelStatus: company.approvelStatus?.status,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, " Body");
      const { id, status, description } = req.body;
      const company = await this.companyInteractor.changeStatus(
        id.trim(),
        status,
        description
      );
      if (status === "Rejected") {
        await rejectMailProducer(company.email, description);
      }
      if(status==="Accepted"){
        await addCompanyProducer(company)
      }
      res.status(200).json({
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
      const page = req.query.page ?? 1;
      console.log(
        "🚀 ~ CompanyController ~ getApprovelCompanies ~ page:",
        page
      );

      const pageSize = req.query.pageSize ?? 6;
      console.log(
        "🚀 ~ CompanyController ~ getApprovelCompanies ~ pageSize:",
        pageSize
      );

      const { companies, totalPages } =
        await this.companyInteractor.getApprovelCompanies(
          Number(page),
          Number(pageSize)
        );

      res
        .status(200)
        .json({ status: true, role: "company", companies, totalPages });
    } catch (error) {
      console.log(
        "🚀 ~ CompanyController ~ getApprovelCompanies ~ error:",
        error
      );
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(` api caling ()(OI)()*I()* ${JSON.stringify(req.body)}`);

      const company = await this.companyInteractor.updateProfile(
        req.body.id,
        req.body.data
      );
      await addCompanyProducer(company);
      res.status(200).json({
        status: true,
        message: "Successfull!!",
        user: company,
        role: "company",
        approvelStatus: company.approvelStatus?.status,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCompanyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.companyInteractor.getCompany(req.params.id);

      res.status(200).json({
        status: true,
        message: "Successfull!!",
        user: company,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllcompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.companyInteractor.getAllCompanies();

      res.status(200).json({
        status: true,
        message: "Successfull!!",
        companies: company,
      });
    } catch (error) {
      next(error);
    }
  }
}
