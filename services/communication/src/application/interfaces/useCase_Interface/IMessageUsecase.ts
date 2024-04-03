import { Message } from "../../../domain/entities/message.entitie";

export interface IMessageUseCase {
  createMessage(body: Message): Promise<Message>;
  deleteMessage(messageId: string): Promise<Message>;
  updateMessage(messageId: string, body: Message): Promise<Message>;
  getAllMessages(chatId: string): Promise<Message[]>;
}
