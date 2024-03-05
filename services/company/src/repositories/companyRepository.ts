import { Company } from "../entities/company.entitie";
import { ICompanyRepository } from "../interfaces/repository_interface/ICompanyRepository";
import companyModel from "../intfrastructure/database/models/companyModel";
import bcrypt from "bcrypt";
export class CompanyRepository implements ICompanyRepository {
  async addCompany(data: Company): Promise<Company> {
    const password = bcrypt.hashSync(data.password, 10);
    const newCompany = await companyModel.create({
      ...data,
      password,
      approvelStatus: {
        status: "Pending",
        description: "Waiting for approval",
      },
    });
    return newCompany.toObject();
  }
}
