import { IAuthInteractor } from "../../interfaces/interactor_interface/IauthInterface";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../utils/lib/generateToken";
export class AuthController {
  private interactor: IAuthInteractor;
  constructor(authInteractor: IAuthInteractor) {
    this.interactor = authInteractor;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = await this.interactor.signup(body);
      const token = generateToken({ id: String(user._id), role: user.role });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ status: true, user });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = await this.interactor.login(body);
      const token = generateToken({ id: String(user._id), role: user.role });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ status: true, user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("access_token")
        res.status(200).json({status:true,message:"Session cleared"})
    } catch (error) {
      next(error);
    }
  }
}
