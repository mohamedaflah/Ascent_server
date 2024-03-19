import { Company } from "../../domain/entities/CompanyEntity";
import { ICompanyRepository } from "../interfaces/repository_interface/ICompanyInterface";
import { ICompanyUseCase } from "../interfaces/userCase_interface/ICompanyUseCase";

export class CompanyUseCase implements ICompanyUseCase {
  private repository: ICompanyRepository;
  constructor(repo: ICompanyRepository) {
    this.repository = repo;
  }
  async addCompany(body: Company): Promise<Company> {
    return await this.repository.addCompany(body);
  }
}
