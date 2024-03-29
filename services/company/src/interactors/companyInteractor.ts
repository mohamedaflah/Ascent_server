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
    return newCompany;
  }
  async getCompany(id: string): Promise<Company> {
    const company = await this.repository.getCompany(id);
    return company;
  }
  async changeStatus(
    id: string,
    status: "Accepted" | "Rejected" | "Pending",
    description: string
  ): Promise<Company> {
    const company = await this.repository.changeStatus(id, status, description);
    return company;
  }
  async getApprovelCompanies(
    page: number,
    pageSize: number
  ): Promise<{ companies: Company[]; totalPages: number }> {
    const companies = this.repository.getApprovelCompanies(page, pageSize);
    return companies;
  }
  async updateProfile(id: string, data: Company): Promise<Company> {
    const updated = await this.repository.updateProfile(id, data);
    return updated;
  }
}
