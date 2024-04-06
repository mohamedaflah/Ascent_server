import { Company } from "../../../domain/entities/company.entity";

export interface ICompanyRepository {
  addCompany(body: Company): Promise<Company>;
}
