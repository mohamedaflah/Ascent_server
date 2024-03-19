import { CompanyUseCase } from "../../../../application/useCases/companyUseCase";
import { Company } from "../../../../domain/entities/CompanyEntity";
import { CompanyRepository } from "../../../../repositories/companyRepository";
import { ConsumerActions } from "../consumers/actions/ConsumerAction";

type AddCompany = (data: Company) => Promise<void>;

interface SubscriberActions {
  [key: string]: AddCompany | undefined;
}

export const subscriber = (): SubscriberActions => {
  const repository=new CompanyRepository()
  const useCase=new CompanyUseCase(repository)
  const consumerActions = new ConsumerActions(useCase);
  return {
    add_company: consumerActions.addCompany.bind(consumerActions),
  };
};
