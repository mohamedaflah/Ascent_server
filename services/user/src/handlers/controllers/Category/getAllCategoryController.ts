import { NextFunction, Request, Response } from "express";
import { ICategoryInteractor } from "../../../interfaces/interactor_interface/ICategoryInteractor";

export class GetAllCategory {
  private categoryInteractor: ICategoryInteractor;
  constructor(interactor: ICategoryInteractor) {
    this.categoryInteractor = interactor;
  }
  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryInteractor.getAllCategory(
        (req.query.limit as unknown as number) ?? 0
      );
      res.status(200).json({ categories:category, status: true, message: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }
}
