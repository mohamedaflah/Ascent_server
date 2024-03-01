import { Otp } from "../../entities/OtpEntity";

export interface IOtpInteractor {
  addOtp(data: Otp): Promise<Otp>;
}
