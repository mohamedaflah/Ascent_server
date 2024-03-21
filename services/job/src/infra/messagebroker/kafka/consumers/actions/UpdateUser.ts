import { IUserUsecase } from "../../../../../application/interfaces/userCase_interface/IUserUsecase";
import { User } from "../../../../../domain/entities/User.entity";

export class UpdateUserConsumer {
  private userUsecase: IUserUsecase;
  constructor(useCase: IUserUsecase) {
    this.userUsecase = useCase;
  }
  async updateUser(body: { user: User; id: string }) {
    try {
      const user = await this.userUsecase.updateUser(body.user, body.id);
      console.log("🚀 ~ UserConsumerAction ~ addUser ~ user:", user);
    } catch (error) {
      console.log("🚀 ~ UserConsumerAction ~ addUser ~ error:", error);
    }
  }
}
