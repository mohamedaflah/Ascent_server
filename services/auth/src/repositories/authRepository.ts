import { User } from "../entities/UserEntity";
import AuthSchema from "../infra/database/mongodb/Schema/AuthSchema";
import { IAuthRepository } from "../interfaces/repository_interface/IauthRepository";
import { checkValidPassword } from "../utils/helper/validate";
import { LoginBody } from "../utils/types/loginType";
import bcrypt from "bcrypt";
export class AuthRepository implements IAuthRepository {
  async signup(body: User): Promise<User> {
    const password = bcrypt.hashSync(body.password, 10);
    const useExist = await AuthSchema.findOne({ email: body.email });
    if(useExist){
      throw new Error("Email already taken !!")
    }
    if(!checkValidPassword(body.password)){
      throw new Error("Password must be at least 8 characters, contain at least one letter, one number, and one special character.")
    }
    const newUser = new AuthSchema({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password,
      role: body.role,
    });
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
