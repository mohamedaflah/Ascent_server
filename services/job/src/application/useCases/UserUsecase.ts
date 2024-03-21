import { User } from "../../domain/entities/User.entity";
import { IUserRepository } from "../interfaces/repository_interface/IUserRepository";
import { IUserUsecase } from "../interfaces/userCase_interface/IUserUsecase";

export class UserUserCase implements IUserUsecase {
  private repository: IUserRepository;
  constructor(repo: IUserRepository) {
    this.repository = repo;
  }
  async addUser(body: User): Promise<User> {
    const user = await this.repository.addUser(body);
    return user;
  }
  async updateUser(body: User, id: string): Promise<User> {
    const newUser = await this.repository.updateUser(body, id);
    return newUser;
  }
}
