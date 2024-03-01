import { Otp } from "../../entities/OtpEntity";

export interface IOtpRepositotry {
  createOtp(data: Otp): Promise<Otp>;
  checkOtp(code:string,email:string):Promise<{status:boolean,user:Otp}>
}
