import { Company } from "../../entities/company.entitie";

export interface ICompanyInteractor {
  addCompany(data: Company): Promise<Company>;
  getCompany(id: string): Promise<Company>;
  changeStatus(
    id: string,
    status: "Accepted" | "Rejected" | "Pending",
    description: string
  ): Promise<Company>;
  getApprovelCompanies(page:number,pageSize:number): Promise<{companies:Company[],totalPages:number}>;
  updateProfile(id:string,data: Company): Promise<Company>;
}
