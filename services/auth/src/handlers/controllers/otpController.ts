import { NextFunction, Request, Response } from "express";
import { IOtpInteractor } from "../../interfaces/interactor_interface/Iotpinteractor";
import AuthSchema from "../../infra/database/mongodb/Schema/AuthSchema";
import { generateToken } from "../../utils/lib/generateToken";

export class OtpController {
  private otpInteractor: IOtpInteractor;
  constructor(otpInteractor: IOtpInteractor) {
    this.otpInteractor = otpInteractor;
  }
  async checkOtp(req: Request, res: Response, next: NextFunction) {
    try {
        const {email,otpcode}=req.body
        const {status,user}=await this.otpInteractor.checkOtp(otpcode,email)
        
        if(status){
            console.log("🚀 ~ OtpController ~ checkOtp ~ user:", user.userData)
            
            let newUser=await new AuthSchema(user.userData).save()
            const token = generateToken({ id: String(newUser._id), role: newUser.role as "user"|"admin"|"company" });
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({status:true,user:newUser??user})
        }else{
            throw new Error(" Something  went wrong ")
        }
    } catch (error) {
      next(error);
    }
  }
}
