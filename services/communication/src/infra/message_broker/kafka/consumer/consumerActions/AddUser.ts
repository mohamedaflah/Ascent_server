import { IUserUsecase } from "../../../../../application/interfaces/useCase_Interface/IuserUsecase";
import { User } from "../../../../../domain/entities/user.entity";

export class UserAddConsumer {
  private userUseCase: IUserUsecase;
  constructor(usecaes: IUserUsecase) {
    this.userUseCase = usecaes;
  }

  async addUser(body: User) {
    try {
      const user = await this.userUseCase.addUser(body);
      console.log("🚀 ~ UserAddConsumer ~ addUser ~ user:", user);
    } catch (error) {
      console.log("🚀 ~ UserAddConsumer ~ addUser ~ error:", error);
    }
  }
}
