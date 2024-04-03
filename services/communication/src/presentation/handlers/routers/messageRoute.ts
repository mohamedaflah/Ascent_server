import { Router } from "express";
import { MessageRepository } from "../../../repositories/messageRepository";
import { MessageUseCase } from "../../../application/useCases/MesageUsecase";

import { GetAllMessageController } from "../controllers/MessageController/getAllMessages";
import { DeleteMessageController } from "../controllers/MessageController/deleteMessage";
import { UpdateMessageController } from "../controllers/MessageController/updateMessage";
import { CreateMessageController } from "../controllers/MessageController/createMessage";

const messageRouter = Router();

const messageRepo = new MessageRepository();
const messageUseCase = new MessageUseCase(messageRepo);

const createMessageController = new CreateMessageController(messageUseCase);
const getAllMessageController = new GetAllMessageController(messageUseCase);
const deleteMessageController = new DeleteMessageController(messageUseCase);
const updateMessageController = new UpdateMessageController(messageUseCase);

messageRouter
  .route("/messages")
  .post(createMessageController.createMessage.bind(createMessageController));

messageRouter
  .route("/messages/:messageId")
  .put(deleteMessageController.deleteMessage.bind(deleteMessageController))
  .patch(updateMessageController.updateMessage.bind(updateMessageController));

messageRouter
  .route("/chats/:chatId")
  .get(getAllMessageController.getAllMessages.bind(getAllMessageController));
export default messageRouter;
