import { IUserUsecase } from "../../../../../application/interfaces/useCase_Interface/IuserUsecase";
import { User } from "../../../../../domain/entities/user.entity";

export class UserUpdateConsumer {
  private userUseCase: IUserUsecase;
  constructor(usecaes: IUserUsecase) {
    this.userUseCase = usecaes;
  }

  async updateUser(body: { user: User; id: string }) {
    try {
      const user = await this.userUseCase.updateUser(body.user,body.id);
      console.log("🚀 ~ UserAddConsumer ~ addUser ~ user:", user);
    } catch (error) {
      console.log("🚀 ~ UserAddConsumer ~ addUser ~ error:", error);
    }
  }
}
