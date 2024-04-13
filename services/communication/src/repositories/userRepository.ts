import mongoose from "mongoose";
import { User } from "../domain/entities/user.entity";
import UserModel from "../infra/database/mongodb/Schema/UserModel";
import { IUserRepository } from "../application/interfaces/repo_interface/IUserinterface";

export class UserRepository implements IUserRepository {
  async addUser(body: User): Promise<User | any> {
    let idExist = await UserModel.findById(body._id);
    if (!idExist) {
      const _id = new mongoose.Types.ObjectId(body._id);
      const newUser = new UserModel({
        _id: _id,
        ...body,
      });
      await newUser.save();
      return newUser.toObject();
    } else {
      return idExist.toObject;
    }
  }
  async updateUser(body: User, id: string): Promise<User> {
    await UserModel.updateOne({ _id: id }, { $set: { ...body } });
    const newUser = await UserModel.findById(id);
    if (!newUser) throw new Error(" Something went wrong");
    return newUser?.toObject();
  }
}
