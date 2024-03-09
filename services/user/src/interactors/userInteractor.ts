import { User } from "../entities/user.entity";
import { IUserInteractor } from "../interfaces/interactor_interface/IUserinteractor";
import { IUserRepository } from "../interfaces/repository_interface/IUserRepository";

export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.userRepository = repository;
  }
  async addUserData(data: User): Promise<User> {
    const user = await this.userRepository.addUserData(data);
    return user;
  }
  async getUserData(id: string): Promise<User> {
    const userData = await this.userRepository.getUserData(id);
    return userData;
  }
  async updatePassword(newPass: string,email:string): Promise<User> {
    const user = await this.userRepository.updatePassword(newPass,email);
    return user;
  }
}
