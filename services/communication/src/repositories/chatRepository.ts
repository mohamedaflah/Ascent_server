import mongoose from "mongoose";
import { IChatRepo } from "../application/interfaces/repo_interface/IChatRepo";
import { Chat } from "../domain/entities/chat.entitie";
import ChatModel from "../infra/database/mongodb/Schema/ChatModel";
import CompanyModel from "../infra/database/mongodb/Schema/CompanyModel";
import UserModel from "../infra/database/mongodb/Schema/UserModel";

export class ChatRepository implements IChatRepo {
  async createOnetwoOneChat(
    firstId: string,
    secondId: string,
    role: "user" | "company" | "admin"
  ): Promise<{ chat: Chat; user: any }> {
    const chat = await ChatModel.findOne({
      members: { $all: [new mongoose.Types.ObjectId(firstId), new mongoose.Types.ObjectId(secondId)] },
    });
    let user;
    if (role === "admin" || role == "user") {
      user = await CompanyModel.findById(secondId);
    } else {
      user = await UserModel.findById(secondId);
    }
    if (chat) return {chat:chat.toObject(),user};
    const newChat = await new ChatModel({
      members: [firstId, secondId],
    }).save();
    
    
    return { chat: newChat.toObject(), user };
  }
}
