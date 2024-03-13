import { NextFunction, Request, Response } from "express";
import { ICategoryInteractor } from "../../../interfaces/interactor_interface/ICategoryInteractor";

export class AddCategoryController {
  private categoryInteractor: ICategoryInteractor;
  constructor(interactor: ICategoryInteractor) {
    this.categoryInteractor = interactor;
  }
  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryInteractor.addCategory(req.body);
      res.status(200).json({category,status:true,message:"Succesfull"})
    } catch (error) {
      next(error);
    }
  }
}
