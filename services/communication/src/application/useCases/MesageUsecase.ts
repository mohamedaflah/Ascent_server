import { Message } from "../../domain/entities/message.entitie";
import { IMessageRepository } from "../interfaces/repo_interface/IMessageRepo";
import { IMessageUseCase } from "../interfaces/useCase_Interface/IMessageUsecase";

export class MessageUseCase implements IMessageUseCase {
  private messageRepository: IMessageRepository;
  constructor(messageRepo: IMessageRepository) {
    this.messageRepository = messageRepo;
  }
  async createMessage(body: Message): Promise<Message> {
    return await this.messageRepository.createMessage(body);
  }
  async deleteMessage(messageId: string): Promise<Message> {
    return await this.messageRepository.deleteMessage(messageId);
  }
  async updateMessage(messageId: string, body: Message): Promise<Message> {
    return await this.messageRepository.updateMessage(messageId, body);
  }
  async getAllMessages(chatId: string): Promise<Message[]> {
    return await this.messageRepository.getAllMessages(chatId);
  }
  async  fetchUnreadMessageAndLastMessage(userId:string): Promise<{ message: Message; count: number; }[]> {
    return await this.messageRepository.fetchUnreadMessageAndLastMessage(userId)
  }
}
