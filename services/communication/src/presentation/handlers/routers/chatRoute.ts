import { Router } from "express";
import { ChatRepository } from "../../../repositories/chatRepository";
import { ChatUseCase } from "../../../application/useCases/chatUsecase";
import { CreateOneTwoOneChat } from "../controllers/chatController/createChat";

const chatRouter = Router();

const chatRepo = new ChatRepository();
const chatUseCase = new ChatUseCase(chatRepo);
const createOneChat = new CreateOneTwoOneChat(chatUseCase);

chatRouter
  .route("/chat")
  .post(createOneChat.createOneTwoOne.bind(createOneChat));

export default chatRouter;
