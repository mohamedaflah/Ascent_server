import mongoose from "mongoose";
import { User } from "../entities/user.entity";
import UserSchema from "../infra/mongodb/Schema/UserSchema";
import { IUserRepository } from "../interfaces/repository_interface/IUserRepository";
import bcrypt from "bcrypt";
export class UserRepository implements IUserRepository {
  async addUserData(data: User): Promise<User> {
    const enuserId = await UserSchema.findById(data._id);
    if (!enuserId) {
      const newUser = await UserSchema.create({
        _id: new mongoose.Types.ObjectId(data._id),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      return newUser.toObject();
    } else {
      throw new Error(" duplicate id ");
    }
  }
  async getUserData(id: string): Promise<User> {
    const user = await UserSchema.findOne({ _id: id });
    if (user) {
      return user?.toObject();
    } else {
      throw new Error("User not found");
    }
  }
  async updatePassword(newPass: string, id: string): Promise<User> {
    const user = await UserSchema.findOne({ _id: id });
    console.log("🚀 ~ UserRepository ~ updatePassword ~ user:", user);

    if (user?.password) {
      user.password = bcrypt.hashSync(newPass, 10);
      await user.save();
      return user.toJSON();
    } else {
      throw new Error("User not found or password is undefined/null");
    }
  }
}
