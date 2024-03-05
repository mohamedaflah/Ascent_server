import { Company } from "../../../entities/company.entitie";
import { CompanyInteractor } from "../../../interactors/companyInteractor";
import { CompanyRepository } from "../../../repositories/companyRepository";
import companyModel from "../../database/models/companyModel";
import { ConsumeerActions } from "./consumers/consumerActions";

type SubscriberFunction = (data: Company) => Promise<any>;

interface SubscriberActions {
  [key: string]: SubscriberFunction | undefined;
}

export const subscriber = (): SubscriberActions => {
  const repository = new CompanyRepository();
  const interactor = new CompanyInteractor(repository);
  const consumerActions = new ConsumeerActions(interactor);
  return{
    addCompany:consumerActions.addCompany.bind(consumerActions)
  }
};
