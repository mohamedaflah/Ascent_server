import { Company } from "../../domain/entities/company.entity";
import { ICompanyUseCase } from "../interfaces/repo_interface/ICompanyUsecase";
import { ICompanyRepository } from "../interfaces/useCase_Interface/IcompanyRepo";

export class CompanyUseCase implements ICompanyUseCase {
  private repository: ICompanyRepository;
  constructor(repo: ICompanyRepository) {
    this.repository = repo;
  }
  async addCompany(body: Company): Promise<Company> {
    return await this.repository.addCompany(body);
  }
}
