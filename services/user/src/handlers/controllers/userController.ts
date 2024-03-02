import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../interfaces/interactor_interface/IUserinteractor";
import jwt from 'jsonwebtoken'
export class UserController {
  private userInteractor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.userInteractor = interactor;
  }
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
        const token=req.cookies.access_token
      const payload:{id:string,role:"user"|"admin"|"company"}|any = jwt.verify(token, String(process.env.JWT_KEY));
      const user = await this.userInteractor.getUserData(payload?.id);
      res.status(200).json({status:true,user,message:"Success!!"})
    } catch (error) {
      next(error);
    }
  }
}
