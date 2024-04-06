import { Company } from "../../../domain/entities/company.entity";

export interface ICompanyUseCase {
  addCompany(body: Company): Promise<Company>;
}
