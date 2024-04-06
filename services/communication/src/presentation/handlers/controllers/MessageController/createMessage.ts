import { NextFunction, Request, Response } from "express";
import { IMessageUseCase } from "../../../../application/interfaces/useCase_Interface/IMessageUsecase";

export class CreateMessageController {
  private useCase: IMessageUseCase;
  constructor(useCase: IMessageUseCase) {
    this.useCase = useCase;
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await this.useCase.createMessage(req.body);
      console.log("🚀 ~ CreateMessageController ~ createMessage ~ message:", message)
      res.status(200).json({ status: true, message });
    } catch (error) {
      next(error);
    }
  }
}
