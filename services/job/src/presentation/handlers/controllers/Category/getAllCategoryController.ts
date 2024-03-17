import { NextFunction, Request, Response } from "express";
import { ICategoryUseCase } from "../../../../application/interfaces/userCase_interface/ICategoryUseCase";

export class GetAllCategory {
  private categoryUseCase: ICategoryUseCase;
  constructor(interactor: ICategoryUseCase) {
    this.categoryUseCase = interactor;
  }
  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryUseCase.getAllCategory(
        (req.query.limit as unknown as number) ?? 0
      );
      res
        .status(200)
        .json({ categories: category, status: true, message: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
