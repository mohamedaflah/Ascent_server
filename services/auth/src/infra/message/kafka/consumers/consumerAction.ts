import { Otp } from "../../../../entities/OtpEntity";
import { OtpInteractor } from "../../../../interactors/otpInteractor";
import { OtpRepository } from "../../../../repositories/otpRepository";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" | "admin" | "company";
}
export class AuthServiceConsumerActions {
  async signupConsumer(otpData: Otp) {
    const otpRepo = new OtpRepository();
    const otpInteractor = new OtpInteractor(otpRepo);
    await otpInteractor.addOtp(otpData);
  }
}
