import mongoose from "mongoose";
import { Company } from "../domain/entities/company.entity";
import { ICompanyRepository } from "../application/interfaces/useCase_Interface/IcompanyRepo";
import CompanyModel from "../infra/database/mongodb/Schema/CompanyModel";

export class CompanyRepository implements ICompanyRepository {
  async addCompany(body: Company): Promise<Company> {
    const _id = new mongoose.Types.ObjectId(body._id);

    const updatedOrNewCompany = await CompanyModel.findByIdAndUpdate(
      _id,
      body,
      { new: true, upsert: true, setDefaultsOnInsert: true } // Options
    );
    console.log("🚀 ~ CompanyRepository ~ addCompany ~ updatedOrNewCompany:", updatedOrNewCompany)
    
    if (!updatedOrNewCompany) {
      throw new Error("Failed to add or update the company");
    }

    console.log("🚀 ~ CompanyRepository ~ addCompany ~ updatedOrNewCompany:", updatedOrNewCompany);
    return updatedOrNewCompany.toObject();
  }
}
