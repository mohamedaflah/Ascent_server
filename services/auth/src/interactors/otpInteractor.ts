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
  async checkOtp(code: string,email:string): Promise<{ status: boolean; user: Otp; }> {
    const {user,status}=await this.otpRepo.checkOtp(code,email)
    return {user,status}
  }
}
