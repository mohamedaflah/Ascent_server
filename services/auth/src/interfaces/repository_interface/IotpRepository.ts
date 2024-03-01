import { Otp } from "../../entities/OtpEntity";

export interface IOtpRepositotry {
  createOtp(data: Otp): Promise<Otp>;
}
