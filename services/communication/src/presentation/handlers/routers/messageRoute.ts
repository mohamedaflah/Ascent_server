import { Router } from "express";
import { MessageRepository } from "../../../repositories/messageRepository";
import { MessageUseCase } from "../../../application/useCases/MesageUsecase";

import { GetAllMessageController } from "../controllers/MessageController/getAllMessages";
import { DeleteMessageController } from "../controllers/MessageController/deleteMessage";
import { UpdateMessageController } from "../controllers/MessageController/updateMessage";
import { CreateMessageController } from "../controllers/MessageController/createMessage";
import { CompanyRepository } from "../../../repositories/companyRepository";
import { CompanyUseCase } from "../../../application/useCases/companyUseCase";
import { AddCompany } from "../controllers/companyController/addCompany";

const messageRouter = Router();

const messageRepo = new MessageRepository();
const messageUseCase = new MessageUseCase(messageRepo);

const createMessageController = new CreateMessageController(messageUseCase);
const getAllMessageController = new GetAllMessageController(messageUseCase);
const deleteMessageController = new DeleteMessageController(messageUseCase);
const updateMessageController = new UpdateMessageController(messageUseCase);

const companyRepo = new CompanyRepository();
const companyUsecase = new CompanyUseCase(companyRepo);
const addCompany = new AddCompany(companyUsecase);

messageRouter
  .route("/messages")
  .post(createMessageController.createMessage.bind(createMessageController));

messageRouter
  .route("/messages/:messageId")
  .delete(deleteMessageController.deleteMessage.bind(deleteMessageController))
  .patch(updateMessageController.updateMessage.bind(updateMessageController));

messageRouter
  .route("/chats/:chatId")
  .get(getAllMessageController.getAllMessages.bind(getAllMessageController));
messageRouter.post("/add-company", addCompany.addCompany.bind(addCompany));
export default messageRouter;
