import { Router } from "express";
import { CompanyRepository } from "../../repositories/companyRepository";
import { CompanyInteractor } from "../../interactors/companyInteractor";
import { CompanyController } from "../controller/companyController";
import { checkAuth } from "../middlewares/checkAuth";
import { checkStatus } from "../middlewares/checkStatus";
const companyRoute = Router();

const repository = new CompanyRepository();
const interactor = new CompanyInteractor(repository);
const companyController = new CompanyController(interactor);
companyRoute
  .route("/company")
  .get(
    checkAuth,
    checkStatus,
    companyController.getCompanyData.bind(companyController)
  )
  .post(companyController.changeStatus.bind(companyController));

export default companyRoute;
