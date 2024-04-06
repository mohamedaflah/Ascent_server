import { NextFunction, Request, Response } from "express";
import { IMessageUseCase } from "../../../../application/interfaces/useCase_Interface/IMessageUsecase";

export class GetAllMessageController {
  private useCase: IMessageUseCase;
  constructor(useCase: IMessageUseCase) {
    this.useCase = useCase;
  }

  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;
      const messages = await this.useCase.getAllMessages(chatId);
      res.status(200).json({ status: true, messages });
    } catch (error) {
      next(error);
    }
  }
}
