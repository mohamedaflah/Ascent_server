import { User } from "../../entities/UserEntity";
import { LoginBody } from "../../utils/types/loginType";

export interface IAuthRepository {
  signup(body: User): Promise<User>;
  login(body: LoginBody): Promise<User>;
}
