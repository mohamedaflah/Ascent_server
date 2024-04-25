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
      return enuserId.toObject();
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
  async updateProfile(id: string, body: User): Promise<User> {
    const updatedUser = await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...body} },
      { new: true } // Return the modified document
    );

    const newUser = await UserSchema.findOne({ _id: id });
    if (!newUser) throw new Error(" Something went wrong");
    return newUser?.toObject();
  }
  async getAllusers(): Promise<User[]|any[]> {
    const allUsers =await UserSchema.find().sort({ createdAt: -1 });
   
    return allUsers;
  }
}
