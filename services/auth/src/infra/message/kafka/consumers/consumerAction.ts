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
  async signupConsumer(verificationLink: Otp) {
    console.log(` Otp consumer called ${JSON.stringify(verificationLink)}`);
    
    const otpRepo = new OtpRepository();
    const otpInteractor = new OtpInteractor(otpRepo);
    await otpInteractor.addOtp(verificationLink);
  }
}
