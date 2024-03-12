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
  );
companyRoute.post(
  "/change-approvel",
  companyController.changeStatus.bind(companyController)
);

companyRoute.get(
  "/get-approvelcompanies",
  companyController.getApprovelCompanies.bind(companyController)
);

companyRoute.post('/update-profile',companyController.updateProfile.bind(companyController))
export default companyRoute;
