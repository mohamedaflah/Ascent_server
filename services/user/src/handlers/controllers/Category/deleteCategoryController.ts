import { NextFunction, Request, Response } from "express";
import { ICategoryInteractor } from "../../../interfaces/interactor_interface/ICategoryInteractor";

export class DeleteCategoryController {
  private categoryInteractor: ICategoryInteractor;
  constructor(interactor: ICategoryInteractor) {
    this.categoryInteractor = interactor;
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(
        `api calling `
      );
      
      const category = await this.categoryInteractor.deleteCategory(req.params.id);
      res.status(200).json({category,status:true,message:"Succesfull",id:category._id})
    } catch (error) {
      next(error);
    }
  }
}
