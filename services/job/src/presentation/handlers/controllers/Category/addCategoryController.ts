import { NextFunction, Request, Response } from "express";
import { ICategoryUseCase } from "../../../../application/interfaces/userCase_interface/ICategoryUseCase";


export class AddCategoryController {
  private categoryUseCase: ICategoryUseCase;
  constructor(interactor: ICategoryUseCase) {
    this.categoryUseCase = interactor;
  }
  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('callind ')
        console.log(req.body,' body of req')
      const category = await this.categoryUseCase.addCategory(req.body);
      res.status(200).json({category,status:true,message:"Succesfull"})
    } catch (error) {
      next(error);
    }
  }
}
