import mongoose from "mongoose";
import { IMessageRepository } from "../application/interfaces/repo_interface/IMessageRepo";
import { Message } from "../domain/entities/message.entitie";
import MessageModel from "../infra/database/mongodb/Schema/MessageModel";
import ChatModel from "../infra/database/mongodb/Schema/ChatModel";

export class MessageRepository implements IMessageRepository {
  async createMessage(body: Message): Promise<Message> {
    const newMessage = new MessageModel({ ...body });
    await newMessage.save();
    return newMessage.toObject();
  }
  async deleteMessage(messageId: string): Promise<Message> {
    console.log(
      "🚀 ~ MessageRepository ~ deleteMessage ~ messageId:",
      messageId
    );
    await MessageModel.updateOne(
      { _id: messageId },
      { $set: { deleteStatus: true } }
    );
    const updatedDocument = await MessageModel.findOne({ _id: messageId });
    if (!updatedDocument) throw new Error("Message not found");
    return updatedDocument?.toObject();
  }
  async updateMessage(messageId: string, body: Message): Promise<Message> {
    const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, {
      $set:  body ,
    });
    if (!updatedMessage) throw new Error("Message not found in updation");
    return updatedMessage?.toObject();
  }
  async getAllMessages(chatId: string): Promise<Message[] | any[]> {
    const messages = await MessageModel.find({ chatId: chatId });
    console.log(
      "🚀 ~ MessageRepository ~ getAllMessages ~ messages:",
      messages
    );
    return messages;
  }
  async fetchUnreadMessageAndLastMessage(
    userId: string
  ): Promise<{ message: Message; count: number }[]> {
    console.log("🚀 ~ MessageRepository ~ userId:", userId);
    const chats = await ChatModel.find({ members: userId });
    const promises = chats.map(async (chat) => {
      const message = await MessageModel.findOne({ chatId: chat._id }).sort({
        createdAt: -1,
      });
      const count = await MessageModel.countDocuments({
        chatId: chat._id,
        status: "unread",
        senderId: { $ne: userId },
      });

      // reciverId?:string
      // message.reciverId = String(chat.members[0]);
      let newMessage;
      if (message) {
        newMessage = {
          ...message?.toObject(),
          reciverId: String(chat.members[1]),
        } as Message;
      } else {
        newMessage = message as unknown as Message;
      }

      return { message: newMessage, count };
    });
    const results = await Promise.all(promises);
    console.log("🚀 ~ MessageRepository ~ results:", results);

    return results;
  }
}
