import { User } from "../../../domain/entities/User.entity";

export interface IUserUsecase {
  addUser(body: User): Promise<User>;
  updateUser(body: User, id: string): Promise<User>;
}
