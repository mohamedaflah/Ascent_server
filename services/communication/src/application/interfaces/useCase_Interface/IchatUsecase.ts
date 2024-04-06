import { Chat } from "../../../domain/entities/chat.entitie";

export interface IChatUsecase {
  createOnetwoOneChat(
    firstId: string,
    secondId: string,
    role: "user" | "company" | "admin"
  ): Promise<{ chat: Chat; user: any }>;
}
