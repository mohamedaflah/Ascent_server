import { User } from "../entities/UserEntity";
import { IAuthInteractor } from "../interfaces/interactor_interface/IauthInterface";
import { IAuthRepository } from "../interfaces/repository_interface/IauthRepository";
import { LoginBody } from "../utils/types/loginType";

export class AuthInteractor implements IAuthInteractor {
  private repository: IAuthRepository;
  constructor(respository: IAuthRepository) {
    this.repository = respository;
  }
  async signup(body: User): Promise<User> {
    const user = await this.repository.signup(body);
    return user;
  }
  async login(body: LoginBody): Promise<User> {
    const user = await this.repository.login(body);
    return user;
  }
  async validateUserData(body: User): Promise<{ status: boolean }> {
    return await this.repository.validateUserData(body);
  }
  async checkEmailExistforForgot(email: string): Promise<User> {
    return await this.repository.checkEmailExistforForgot(email);
  }
  async updatePassword(email: string, newPass: string): Promise<User> {
    return await this.repository.updatePassword(email, newPass);
  }
}
