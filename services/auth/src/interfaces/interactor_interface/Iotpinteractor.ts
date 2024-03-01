import { Otp } from "../../entities/OtpEntity";

export interface IOtpInteractor {
  addOtp(data: Otp): Promise<Otp>;
  checkOtp(code:string,email:string):Promise<{status:boolean,user:Otp}>;
}
