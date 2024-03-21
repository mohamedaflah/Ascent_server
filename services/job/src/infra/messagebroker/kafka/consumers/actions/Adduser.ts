import { IUserUsecase } from "../../../../../application/interfaces/userCase_interface/IUserUsecase";
import { User } from "../../../../../domain/entities/User.entity";

export class UserConsumerAction {
  private userUsecase: IUserUsecase;
  constructor(useCase: IUserUsecase) {
    this.userUsecase = useCase;
  }
  async addUser(body: User) {
    try {
        const user=await this.userUsecase.addUser(body)
        console.log("🚀 ~ UserConsumerAction ~ addUser ~ user:", user)
    } catch (error) {
      console.log("🚀 ~ UserConsumerAction ~ addUser ~ error:", error);
    }
  }
}
