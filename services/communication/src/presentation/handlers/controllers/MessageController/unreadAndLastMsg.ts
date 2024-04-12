import { NextFunction, Request, Response } from "express";
import { IMessageUseCase } from "../../../../application/interfaces/useCase_Interface/IMessageUsecase";

export class FetchUnreadAndLastMessage {
  private messageUseCase: IMessageUseCase;
  constructor(messageUseCase: IMessageUseCase) {
    this.messageUseCase = messageUseCase;
  }
  async fetchUnreadAndLastMsg(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.body,'  BDY')
      const result = await this.messageUseCase.fetchUnreadMessageAndLastMessage(
        req.body.userId
      );
        return res.status(200).json({ status: true, result });
    } catch (error) {
      next(error);
    }
  }
}
