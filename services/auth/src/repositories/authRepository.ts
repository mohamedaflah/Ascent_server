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
    console.log(" called -- useExist 999");
    if (useExist) {
      throw new Error("Email already taken !!");
    }
    if (!checkValidPassword(body.password)) {
      throw new Error(
        "Password must be at least 8 characters, contain at least one letter, one number, and one special character."
      );
    }
    let newUser;
    console.log(body.role,' +>       ROle');
    
    if (body.role == "user" || body.role == "admin") {
      newUser = new AuthSchema({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password,
        role: body.role,
      });
    } else {
      console.log("Name => ",body.name);
      
      const nameExist = await AuthSchema.findOne({ name: body.name });
      console.log("🚀 ~ AuthRepository ~ signup ~ nameExist:", nameExist)
      if (nameExist)
        throw new Error(" Company Already Registered with this name");
      newUser = new AuthSchema({
        name: body.name,
        email: body.email,
        password,
        role: body.role,
      });
    }
    await newUser.save();
    return newUser.toObject();
  }
  async login(
    body: LoginBody,
    role?: "user" | "admin" | "company"
  ): Promise<User> {
    const userData = await AuthSchema.findOne({ email: body.email });
    console.log("🚀 ~ AuthRepository ~ login ~ userData:", userData);
    if (!userData ) { //|| userData.role !== role
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
  async validateUserData(body: User): Promise<{ status: boolean }> {
    console.log("🚀 ~ AuthRepository ~ validateUserData ~ body:", body);
    const emailExist = await AuthSchema.findOne({ email: body.email });

    if (emailExist) {
      throw new Error("Email already taken!!");
    }
    if (body.role == "company") {
      const nameExist = await AuthSchema.findOne({ name: body.name });
      if (nameExist)
        throw new Error(`Company Already Registered with this name`);
    }
    return { status: true };
  }
  async checkEmailExistforForgot(email: string): Promise<User> {
    const emailExist = await AuthSchema.findOne({ email: email });
    if (emailExist) {
      return emailExist.toObject();
    }

    throw new Error(" User not found with this email");
  }

  async updatePassword(newPass: string, email: string): Promise<User> {
    console.log("🚀 ~ AuthRepository ~ updatePassword ~ email:", email);
    const user = await AuthSchema.findOne({ email: email });
    console.log("🚀 ~ UserRepository ~ updatePassword ~ user:", user);
    if (user?.password) {
      user.password = bcrypt.hashSync(newPass, 10);
      await user.save();
      return user.toJSON();
    } else {
      throw new Error("User not found or password is undefined/null");
    }
  }
  async changePassword(
    email: string,
    currentPass: string,
    newPass: string
  ): Promise<User> {
    if (!email) throw new Error("Please provide email");
    const user = await AuthSchema.findOne({ email: email });
    if (!user?.password) throw new Error("Please provide password");
    const comparedPass = bcrypt.compareSync(currentPass, user?.password);
    if (!comparedPass) throw new Error("Incorrect Password");
    const hashed = bcrypt.hashSync(newPass, 10);
    await AuthSchema.updateOne(
      { email: email },
      { $set: { password: hashed } }
    );
    return user.toObject();
  }
}
