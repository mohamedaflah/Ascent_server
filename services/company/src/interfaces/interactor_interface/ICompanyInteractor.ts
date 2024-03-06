import { Company } from "../../entities/company.entitie";

export interface ICompanyInteractor {
  addCompany(data: Company): Promise<Company>;
  getCompany(id: string): Promise<Company>;
}
