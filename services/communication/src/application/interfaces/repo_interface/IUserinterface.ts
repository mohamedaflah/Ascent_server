import { User } from "../../../domain/entities/user.entity";

export interface IUserRepository {
  addUser(body: User): Promise<User>;
  updateUser(body: User, id: string): Promise<User>;
}
