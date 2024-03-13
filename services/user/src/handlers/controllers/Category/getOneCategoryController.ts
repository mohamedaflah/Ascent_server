import { NextFunction, Request, Response } from "express";
import { ICategoryInteractor } from "../../../interfaces/interactor_interface/ICategoryInteractor";

export class GetOneCategory {
  private categoryInteractor: ICategoryInteractor;
  constructor(interactor: ICategoryInteractor) {
    this.categoryInteractor = interactor;
  }
  async getSpecificCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryInteractor.getCategory(req.params.id);
      res.status(200).json({category,status:true,message:"Succesfull"})
    } catch (error) {
      next(error);
    }
  }
}
