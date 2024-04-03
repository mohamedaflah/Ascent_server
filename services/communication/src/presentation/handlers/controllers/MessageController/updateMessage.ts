import { NextFunction, Request, Response } from "express";
import { IMessageUseCase } from "../../../../application/interfaces/useCase_Interface/IMessageUsecase";

export class UpdateMessageController {
  private useCase: IMessageUseCase;
  constructor(useCase: IMessageUseCase) {
    this.useCase = useCase;
  }

  async updateMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const message = await this.useCase.updateMessage(messageId, req.body);
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }
}
