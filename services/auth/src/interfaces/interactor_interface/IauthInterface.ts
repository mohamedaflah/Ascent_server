import { User } from "../../entities/UserEntity";
import { LoginBody } from "../../utils/types/loginType";

export interface IAuthInteractor {
  signup(body: User): Promise<User>;
  login(body: LoginBody,role?:"user"|"admin"|"company"): Promise<User>;
  validateUserData(body: User): Promise<{ status: boolean }>;
  checkEmailExistforForgot(email: string): Promise<User>;
  updatePassword(email: string, newPass: string): Promise<User>;
  changePassword(
    email: string,
    currentPass: string,
    newPass: string
  ): Promise<User>;
}
