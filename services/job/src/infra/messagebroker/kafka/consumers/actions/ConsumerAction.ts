import { ICompanyUseCase } from "../../../../../application/interfaces/userCase_interface/ICompanyUseCase";
import { Company } from "../../../../../domain/entities/CompanyEntity";

export class ConsumerActions {
  private useCase: ICompanyUseCase;
  constructor(useCase: ICompanyUseCase) {
    this.useCase = useCase;
  }
  async addCompany(data: Company) {
    console.log("🚀 ~ ConsumerActions ~ addCompany ~ data:", data)
    const company=await this.useCase.addCompany(data)
    console.log("🚀 ~ ConsumerActions ~ addCompany ~ company:", company)
    console.log(` consuemer action called `);
    
  }
}
