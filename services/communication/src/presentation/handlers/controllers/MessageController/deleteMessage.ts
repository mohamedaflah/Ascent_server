import { NextFunction, Request, Response } from "express";
import { IMessageUseCase } from "../../../../application/interfaces/useCase_Interface/IMessageUsecase";

export class DeleteMessageController {
  private useCase: IMessageUseCase;
  constructor(useCase: IMessageUseCase) {
    this.useCase = useCase;
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const message = await this.useCase.deleteMessage(messageId);
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }
}
