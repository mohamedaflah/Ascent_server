import { NextFunction, Request, Response } from "express";
import { ICategoryUseCase } from "../../../../application/interfaces/userCase_interface/ICategoryUseCase";

export class GetOneCategory {
  private categoryUseCase: ICategoryUseCase;
  constructor(interactor: ICategoryUseCase) {
    this.categoryUseCase = interactor;
  }
  async getSpecificCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryUseCase.getCategory(req.params.id);
      res.status(200).json({ category, status: true, message: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
