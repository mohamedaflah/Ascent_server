import { Otp } from "../entities/OtpEntity";
import { IOtpInteractor } from "../interfaces/interactor_interface/Iotpinteractor";
import { IOtpRepositotry } from "../interfaces/repository_interface/IotpRepository";

export class OtpInteractor implements IOtpInteractor {
  private otpRepo: IOtpRepositotry;
  constructor(otprepo: IOtpRepositotry) {
    this.otpRepo = otprepo;
  }
  async addOtp(data: Otp): Promise<Otp> {
    const otp = await this.otpRepo.createOtp(data);
    return otp;
  }
  async checkExpiryofLink(email:string): Promise<{ status: boolean; data: Otp; }> {
    const {data,status}=await this.otpRepo.checkExpiryofLink(email)
    return {data,status}
  }
}
