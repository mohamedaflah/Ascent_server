import { User } from "../../entities/UserEntity";
import { LoginBody } from "../../utils/types/loginType";

export interface IAuthInteractor {
  signup(body: User): Promise<User>;
  login(body: LoginBody): Promise<User>;
  validateUserData(body: User): Promise<{ status: boolean }>;
}
