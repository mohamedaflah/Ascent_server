import { IMessageRepository } from "../application/interfaces/repo_interface/IMessageRepo";
import { Message } from "../domain/entities/message.entitie";
import MessageModel from "../infra/database/mongodb/Schema/MessageModel";

export class MessageRepository implements IMessageRepository {
  async createMessage(body: Message): Promise<Message> {
    const newMessage = new MessageModel(body);
    await newMessage.save();
    return newMessage.toObject();
  }
  async deleteMessage(messageId: string): Promise<Message> {
    console.log("🚀 ~ MessageRepository ~ deleteMessage ~ messageId:", messageId)
    const message = await MessageModel.findByIdAndUpdate(messageId, {
      $set: { deleteStatus: true },
    });
    if (!message) throw new Error("Message not found");
    return message?.toObject();
  }
  async updateMessage(messageId: string, body: Message): Promise<Message> {
    const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, {
      $set: { body },
    });
    if (!updatedMessage) throw new Error("Message not found in updation");
    return updatedMessage?.toObject();
  }
  async getAllMessages(chatId: string): Promise<Message[] | any[]> {
    const messages = await MessageModel.find({ chatId: chatId });
    return messages;
  }
}
