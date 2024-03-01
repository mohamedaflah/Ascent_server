import { Otp } from "../../entities/OtpEntity";

export interface IOtpRepositotry {
  createOtp(data: Otp): Promise<Otp>;
  checkExpiryofLink(email:string):Promise<{status:boolean,data:Otp}>;
}
