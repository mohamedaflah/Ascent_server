import { User } from "../entities/user.entity";
import UserSchema from "../infra/mongodb/Schema/UserSchema";
import { IUserRepository } from "../interfaces/repository_interface/IUserRepository";

export class UserRepository implements IUserRepository {
  async addUserData(data: User): Promise<User> {
    const newUser = new UserSchema(data);
    await newUser.save();
    return newUser.toObject();
  }
  async getUserData(id: string): Promise<User> {
    const user = await UserSchema.findOne({ _id: id });
    if (user) {
      return user?.toObject();
    } else {
      throw new Error("User not found");
    }
  }
}
