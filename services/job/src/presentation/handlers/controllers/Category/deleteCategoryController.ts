import { NextFunction, Request, Response } from "express";
import { ICategoryUseCase } from "../../../../application/interfaces/userCase_interface/ICategoryUseCase";

export class DeleteCategoryController {
  private categoryUseCase: ICategoryUseCase;
  constructor(useCase: ICategoryUseCase) {
    this.categoryUseCase = useCase;
  }
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(
        `api calling `
      );
      
      const category = await this.categoryUseCase.deleteCategory(req.params.id);
      res.status(200).json({category,status:true,message:"Succesfull",id:category._id})
    } catch (error) {
      next(error);
    }
  }
}
