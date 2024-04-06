import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../interfaces/repo_interface/IUserinterface";

export class UserUseCase implements IUserRepository {
  private userRepository: IUserRepository;
  constructor(repo: IUserRepository) {
    this.userRepository = repo;
  }
  async addUser(body: User): Promise<User> {
    const user = await this.userRepository.addUser(body);
    return user;
  }
  async updateUser(body: User, id: string): Promise<User> {
    const user = await this.userRepository.updateUser(body, id);
    return user;
  }
}
