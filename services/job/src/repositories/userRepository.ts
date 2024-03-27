import mongoose from "mongoose";
import { IUserRepository } from "../application/interfaces/repository_interface/IUserRepository";
import UserModel from "../infra/databases/mongodb/models/UserModel";
import { User } from "../domain/entities/User.entity";

export class UserRepository implements IUserRepository {
  async addUser(body: User): Promise<User | any> {
    let idExist = await UserModel.findById(body._id);
    if (!idExist) {
      const newUser = await UserModel.create({
        _id: new mongoose.Types.ObjectId(body._id),
        ...body,
      });
      return newUser.toObject();
    } else {
      return idExist.toObject;
    }
  }
  async updateUser(body: User, id: string): Promise<User> {
    await UserModel.updateOne({ _id: id }, { $set: { ...body } });
    const newUser = await UserModel.findById(id);
    if(!newUser) throw new Error(" Something went wrong")
    return newUser?.toObject();
  }
}
