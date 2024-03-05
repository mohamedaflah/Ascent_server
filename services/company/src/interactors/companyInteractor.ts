import { Company } from "../entities/company.entitie";
import { ICompanyInteractor } from "../interfaces/interactor_interface/ICompanyInteractor";
import { ICompanyRepository } from "../interfaces/repository_interface/ICompanyRepository";

export class CompanyInteractor implements ICompanyInteractor {
  private repository: ICompanyRepository;
  constructor(reository: ICompanyRepository) {
    this.repository = reository;
  }
  async addCompany(data: Company): Promise<Company> {
    const newCompany = await this.repository.addCompany(data);
    return newCompany
  }
}
