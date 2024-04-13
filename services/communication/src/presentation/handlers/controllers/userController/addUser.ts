import { NextFunction, Request, Response } from "express";
import { IUserUsecase } from "../../../../application/interfaces/useCase_Interface/IuserUsecase";

export class AddUser {
  private UserUseCase: IUserUsecase;
  constructor(useCase: IUserUsecase) {
    this.UserUseCase = useCase;
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.UserUseCase.addUser(req.body);
      res.status(200).json({ user, status: true, message: "Successfull" });
    } catch (error) {
      next(error);
    }
  }
}
