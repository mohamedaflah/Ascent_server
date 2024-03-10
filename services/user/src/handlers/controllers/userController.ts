import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../interfaces/interactor_interface/IUserinteractor";
import jwt from "jsonwebtoken";
export class UserController {
  private userInteractor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.userInteractor = interactor;
  }
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.access_token;
      const payload: { id: string; role: "user" | "admin" | "company" } =
        jwt.verify(token, String(process.env.JWT_KEY)) as {
          id: string;
          role: "user" | "admin" | "company";
        };
      const user = await this.userInteractor.getUserData(payload?.id);
      res
        .status(200)
        .json({ status: true, user, message: "Success!!", role: user.role });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Calling ");
      const token = req.cookies.forgot_key;
      if (!token) throw new Error(" Your Verification link is Expired ");
      const { email } = jwt.verify(
        token,
        process.env.JWT_EMAIL_VALIDATION_KEY as string
      ) as { email: string };
      const { newPass } = req.body;
      console.log("🚀 ~ UserController ~ updatePassword ~ newPass:", newPass)
      const user = await this.userInteractor.updatePassword(newPass, email);
      res.status(200).json({
        status: true,
        message: "Password changed ",
        changeStatus: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkForgotPassToken(req: Request, res: Response, next: NextFunction) {
    try {
      // forgot_key
      console.log("key))");

      const { token: bodyToken } = req.body;
      const token = req.cookies.forgot_key;
      if (!token) {
        throw new Error("Your Verification link in expired");
      }
      if (bodyToken !== token) throw new Error("Token not matching");
      res.status(200).json({ status: true, message: " token found " });
    } catch (error) {
      next(error);
    }
  }
}
