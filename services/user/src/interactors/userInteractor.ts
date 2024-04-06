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
  async updatePassword(newPass: string, id: string): Promise<User> {
    const user = await this.userRepository.updatePassword(newPass, id);
    return user;
  }
  async updateProfile(id: string, body: User): Promise<User> {
    return await this.userRepository.updateProfile(id, body);
  }
  async getAllusers(): Promise<User[]|any[]> {
    const users=await this.userRepository.getAllusers();
    return users 
  }
}
