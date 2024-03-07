import { IAuthInteractor } from "../../interfaces/interactor_interface/IauthInterface";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../utils/lib/generateToken";
import { signupProducer } from "../../infra/message/kafka/producers/userVerifying";
import { validateSignupData } from "../../utils/helper/signupValidation";
import OtpSchema from "../../infra/database/mongodb/Schema/linkSchema";
import jwt from "jsonwebtoken";
import {
  generateEmailValidationToken,
  getPaylaod,
} from "../../utils/helper/emailVerifications";
import { payload } from "../../utils/types/loginType";
import { userAddProducer } from "../../infra/message/kafka/producers/userAddProducer";
import { companyAddProducer } from "../../infra/message/kafka/producers/companyAddProducer";
export class AuthController {
  private interactor: IAuthInteractor;
  constructor(authInteractor: IAuthInteractor) {
    this.interactor = authInteractor;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.interactor.validateUserData(body);
      const signupValidation = validateSignupData(body);
      if (signupValidation.status) {
        return res
          .status(400)
          .json({ status: false, message: signupValidation.message });
      }
      const token = generateEmailValidationToken(body);
      let verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}/role=${body.role}`;
      await signupProducer(verificationLink);

      res.status(200).json({
        status: true,
        message: "Verification link sended",
        user: null,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("calling");
      
      const body = req.body;
      if(req.body.email==="admin@gmail.com"){

      }
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
      res.status(200).json({ status: true, user,role:user.role });
    } catch (error) {
      next(error);
    }
  }

  async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ status: true, message: "Session cleared",user:null });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: payload = getPaylaod(req.params.token);
      const linkExpiry = await OtpSchema.findOne({ email: userData.email });
      if (!linkExpiry) {
        return res.status(400).json({
          status: false,
          message: "Your verification link is Expired",
        });
      }
      
      // const user = await this.interactor.signup({
      //   email: userData.email,
      //   firstname: userData.firstname,
      //   lastname: userData.lastname,
      //   password: userData.password,
      //   role: userData.role,
      // });
      let user;
      if (userData.role === "user" || userData.role === "admin") {
        user = await this.interactor.signup({
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          password: userData.password,
          role: userData.role,
        });
        await userAddProducer(user);
      } else if (userData.role === "company") {
        user = await this.interactor.signup({
          email: userData.email,
          name: userData.name, 
          password: userData.password,
          role: userData.role,
        });
        await companyAddProducer(user)
      } else { 
        return res.status(400).json({
          status: false,
          message: "Invalid user role",
        });
      }
      
      // await OtpSchema.deleteOne({ email: user.email });
      const token = generateToken({ id: String(user._id), role: user.role });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json({ status: true, user: user, message: "User signup successfull" });
    } catch (error) {
      console.log(error, ' )')
      next(error);
    }
  }
  checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.cookies,'  **(');
      
      const token = req.cookies.access_token;
      console.log("🚀 ~ AuthController ~ checkRole ~ token:", token)
      console.log(req.cookies.access_token)
      if (!token) {
        throw new Error("Not Autherized");
      }
      const payload:{id:string,role:"admin"|"user"|"company"} = jwt.verify(token, String(process.env.JWT_KEY)) as {id:string,role:"admin"|"user"|"company"}
      res.status(200).json({status:true,role:payload?.role})
    } catch (error) {
      next(error);
    }
  }
}
