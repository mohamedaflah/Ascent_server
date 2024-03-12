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
      profileCompleted: false,
      profileCompletionStatus:"1%"
    });
    return newCompany.toObject();
  }
  async getCompany(id: string): Promise<Company> {
    const company = await companyModel.findOne({ _id: id });
    if (company?.approvelStatus?.status === "Pending") {
      throw new Error("Admin not responded of your request wait for approvel");
    }
    if (company?.approvelStatus?.status === "Rejected") {
      throw new Error("Admin rejected your request");
    }
    if (company) {
      return company.toObject();
    } else {
      throw new Error(" Company not found ");
    }
  }
  async changeStatus(
    id: string,
    status: "Accepted" | "Rejected" | "Pending",
    description: string
  ): Promise<Company> {
    const company = await companyModel.findOne({ _id: id });
    if (!company) {
      throw new Error("Company not found");
    }
    if (!company.approvelStatus) {
      company.approvelStatus = {};
    }
    company.approvelStatus.status = status;
    company.approvelStatus.description = description;
    await company.save();
    return company.toObject();
  }
  async getApprovelCompanies(): Promise<Company[] | any[]> {
    const companies = await companyModel
      .find({
        "approvelStatus.status": "Pending",
      })
      .sort({ createdAt: -1 });
    return companies;
  }
  async updateProfile(id: string, data: Company): Promise<Company> {
    const company = await companyModel.findOne({ _id: id });
    if (!company) throw new Error("Company not found");
    await companyModel.updateOne({ _id: id }, { $set: data });
    const updated = await companyModel.findOne({ _id: id });
    if (updated) {
      return updated?.toObject();
    }else{
      throw new Error(`Something went wrong`)
    }
  }
}
