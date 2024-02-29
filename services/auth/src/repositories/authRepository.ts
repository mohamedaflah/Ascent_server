import { User } from "../entities/UserEntity";
import AuthSchema from "../infra/database/mongodb/Schema/AuthSchema";
import { IAuthRepository } from "../interfaces/repository_interface/IauthRepository";
import { LoginBody } from "../utils/types/loginType";
import bcrypt from "bcrypt";
export class AuthRepository implements IAuthRepository {
  async signup(body: User): Promise<User> {
    const password = bcrypt.hashSync(body.password, 10);
    const newUser = new AuthSchema({ ...body, password });
    await newUser.save();
    return newUser.toObject();
  }
  async login(body: LoginBody): Promise<User> {
    const userData = await AuthSchema.findOne({ email: body.email });
    if (!userData) {
      throw new Error("User not found");
    }
    const passMatch: boolean = bcrypt.compareSync(
      body.password,
      userData.password
    );
    if (!passMatch) {
      throw new Error("Incorrect Email or password");
    }
    return userData.toObject();
  }
}
