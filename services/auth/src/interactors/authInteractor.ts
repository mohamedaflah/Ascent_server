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
}
