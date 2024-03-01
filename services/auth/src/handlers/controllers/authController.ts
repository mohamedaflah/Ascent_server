import { IAuthInteractor } from "../../interfaces/interactor_interface/IauthInterface";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../utils/lib/generateToken";
import { signupProducer } from "../../infra/message/kafka/producers/userSignupProducer";
import { validateSignupData } from "../../utils/helper/signupValidation";
import OtpSchema from '../../infra/database/mongodb/Schema/linkSchema'
import {
  generateEmailValidationToken,
  getPaylaod,
} from "../../utils/helper/emailVerifications";
import { payload } from "../../utils/types/loginType";
export class AuthController {
  private interactor: IAuthInteractor;
  constructor(authInteractor: IAuthInteractor) {
    this.interactor = authInteractor;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const signupValidation = validateSignupData(body);
      if (signupValidation.status) {
        return res
          .status(400)
          .json({ status: false, message: signupValidation.message });
      }
      const token = generateEmailValidationToken(body);
      const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
      await signupProducer(verificationLink);

      res
        .status(200)
        .json({ status: true, message: " Verification Link sended you mail" });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = await this.interactor.login(body);
      const token = generateToken({
        id: String(user._id),
        role: user.role as "user" | "admin" | "company",
      });
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

  async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ status: true, message: "Session cleared" });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      
      const userData: payload = getPaylaod(req.params.token);
      const linkExpiry=await OtpSchema.findOne({email:userData.email})
      if(!linkExpiry){
        return res.status(400).json({status:false,message:"You Link is Expired"})
      }
      const user = await this.interactor.signup({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        role: userData.role,
      });
      const token = generateToken({ id: String(user._id), role: user.role });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ status: true, user: user });
    } catch (error) {
      next(error);
    }
  }
}
