import { NextFunction, Request, Response } from "express";
import { ICategoryUseCase } from "../../../../application/interfaces/userCase_interface/ICategoryUseCase";

export class UpdateCategoryController {
  private categoryUseCase: ICategoryUseCase;
  constructor(interactor: ICategoryUseCase) {
    this.categoryUseCase = interactor;
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryUseCase.updateCategory(
        req.body,
        req.params.id
      );
      res.status(200).json({ category, status: true, message: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
