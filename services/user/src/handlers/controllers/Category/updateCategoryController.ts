import { NextFunction, Request, Response } from "express";
import { ICategoryInteractor } from "../../../interfaces/interactor_interface/ICategoryInteractor";

export class UpdateCategoryController {
  private categoryInteractor: ICategoryInteractor;
  constructor(interactor: ICategoryInteractor) {
    this.categoryInteractor = interactor;
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryInteractor.updateCategory(req.body,req.params.id);
      res.status(200).json({category,status:true,message:"Succesfull"})
    } catch (error) {
      next(error);
    }
  }
}
