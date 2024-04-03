import { Chat } from "../../domain/entities/chat.entitie";
import { IChatRepo } from "../interfaces/repo_interface/IChatRepo";
import { IChatUsecase } from "../interfaces/useCase_Interface/IchatUsecase";

export class ChatUseCase implements IChatUsecase {
  private chatRepo: IChatRepo;
  constructor(repo: IChatRepo) {
    this.chatRepo = repo;
  }
  async createOnetwoOneChat(
    firstId: string,
    secondId: string,
    role: "user" | "company" | "admin"
  ): Promise<{ chat: Chat; user: any }> {
    return await this.chatRepo.createOnetwoOneChat(firstId, secondId, role);
  }
}
