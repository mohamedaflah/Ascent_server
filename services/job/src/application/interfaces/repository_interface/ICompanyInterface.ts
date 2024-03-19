import { Company } from "../../../domain/entities/CompanyEntity";

export interface ICompanyRepository {
  addCompany(body: Company): Promise<Company>;
}
