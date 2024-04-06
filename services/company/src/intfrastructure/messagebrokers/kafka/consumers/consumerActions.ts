import { Company } from "../../../../entities/company.entitie";
import { ICompanyInteractor } from "../../../../interfaces/interactor_interface/ICompanyInteractor";


export class ConsumeerActions {
  private interactor: ICompanyInteractor;
  constructor(interactor: ICompanyInteractor) {
    this.interactor = interactor;
  }
  async addCompany(data: Company) {
    try {
      const newCompany = await this.interactor.addCompany(data);
      console.log("🚀 ~ ConsumeerActions ~ addUser ~ newCompany:", newCompany);

    } catch (error) {
      console.log(` Error in Adduser Consumer Action ${error}`);
    }
  }
}
