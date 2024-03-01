import { Otp } from "../entities/OtpEntity";
import OtpSchema from "../infra/database/mongodb/Schema/linkSchema";
import { IOtpRepositotry } from "../interfaces/repository_interface/IotpRepository";

export class OtpRepository implements IOtpRepositotry {
  async createOtp(data: Otp): Promise<Otp> {
    console.log("🚀 ~ OtpRepository ~ createOtp ~ otp: !1", data);
    const useExistInOtp = await OtpSchema.findOne({ email: data.email });
    if (useExistInOtp) {
      useExistInOtp.link = data.link;
      await useExistInOtp.save();
      return useExistInOtp.toObject();
    } else {
      const otp = await new OtpSchema(data).save();
      console.log("🚀 ~ OtpRepository ~ createOtp ~ otp:", otp);
      return otp.toObject();
    }
  }
  async checkExpiryofLink(
    email: string
  ): Promise<{ status: boolean; data: Otp }> {
    // throw new Error("Method not implemented.");
    const otpData = await OtpSchema.findOne({ email: email });
    if(!otpData){
      throw new Error(" Your Link was Expired")
    }
    return { status: true, data: otpData.toObject() };
  }
}
