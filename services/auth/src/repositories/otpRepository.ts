import { Otp } from "../entities/OtpEntity";
import OtpSchema from "../infra/database/mongodb/Schema/OtpSchema";
import { IOtpRepositotry } from "../interfaces/repository_interface/IotpRepository";

export class OtpRepository implements IOtpRepositotry {
  async createOtp(data: Otp): Promise<Otp> {
    const otp = await new OtpSchema(data).save();
    return otp.toObject();
  }
}
