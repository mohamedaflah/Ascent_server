import { Company } from "../../../domain/entities/CompanyEntity";

export interface ICompanyUseCase {
  addCompany(body: Company): Promise<Company>;
}
