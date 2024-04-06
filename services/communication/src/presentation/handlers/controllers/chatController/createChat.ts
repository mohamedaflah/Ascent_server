import { NextFunction, Request, Response } from "express";
import { IChatUsecase } from "../../../../application/interfaces/useCase_Interface/IchatUsecase";

export class CreateOneTwoOneChat {
  private useCases: IChatUsecase;
  constructor(useCase: IChatUsecase) {
    this.useCases = useCase;
  }

  async createOneTwoOne(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const { user, chat } = await this.useCases.createOnetwoOneChat(
        req.body.firstId,
        req.body.secondId,
        req.body.role
      );
      console.log("🚀 ~ CreateOneTwoOneChat ~ createOneTwoOne ~ chat:", chat);
      res.status(200).json({
        status: true,
        message: "Succesfull",
        selectedUser: user,
        chat,
      });
    } catch (error) {
      next(error);
    }
  }
}
