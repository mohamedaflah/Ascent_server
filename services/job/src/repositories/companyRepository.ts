import mongoose from "mongoose";
import { ICompanyRepository } from "../application/interfaces/repository_interface/ICompanyInterface";
import { Company } from "../domain/entities/CompanyEntity";
import CompanyModel from "../infra/databases/mongodb/models/CompanyModel";

export class CompanyRepository implements ICompanyRepository {
  async addCompany(body: Company): Promise<Company> {
    const _id = new mongoose.Types.ObjectId(body._id);
    
    // Try to find and update the company, or insert it if it doesn't exist
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
