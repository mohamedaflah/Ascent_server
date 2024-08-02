import { IAuthInteractor } from "../../interfaces/interactor_interface/IauthInterface";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../utils/lib/generateToken";
import { signupProducer } from "../../infra/message/kafka/producers/userVerifying";
import { validateSignupData } from "../../utils/helper/signupValidation";
import OtpSchema from "../../infra/database/mongodb/Schema/linkSchema";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  generateEmailValidationToken,
  getPaylaod,
} from "../../utils/helper/emailVerifications";
import { payload } from "../../utils/types/loginType";
import { userAddProducer } from "../../infra/message/kafka/producers/userAddProducer";
import { companyAddProducer } from "../../infra/message/kafka/producers/companyAddProducer";
import { sendForgotMailLink } from "../../infra/message/kafka/producers/sendForgotPassmail";
import { updatePassProducer } from "../../infra/message/kafka/producers/updatePasswordProducer";
import { generateOTP } from "../../utils/lib/generateOtp";
import { otpProducer } from "../../infra/message/kafka/producers/otpProducer";
export class AuthController {
  private interactor: IAuthInteractor;
  constructor(authInteractor: IAuthInteractor) {
    this.interactor = authInteractor;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.interactor.validateUserData(body);
      const signupValidation = validateSignupData(body);

      if (signupValidation.status) {
        return res
          .status(400)
          .json({ status: false, message: signupValidation.message });
      }

      const token = generateEmailValidationToken(body);
      const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}/role=${body.role}`;
      console.log("🚀 ~ AuthController ~ signup ~BEFORE 1:");

      if (req.body && req.body.type === "otp") {
        console.log("🚀 ~ AuthController ~ signup ~BEFORE 2:");
        const otp = generateOTP();
        const otpExist = await OtpSchema.findOne({ email: req.body.email });

        if (!otpExist) {
          await new OtpSchema({
            email: req.body.email,
            otp: otp,
            link: "",
          }).save();

          console.log("🚀 ~ AuthController ~ signup ~BEFORE:");

          try {
            const response = await axios.post(
              "https://ascent-notification-3m4p.onrender.com/api/auth-service/send-otp",
              {
                data: {
                  tag: `<h1 style="color:blue;font-weight:800">${otp}</h1>`,
                  email: req.body.email,
                },
              }
            );

            console.log(
              "🚀 ~ AuthController ~ signup ~ response.data:",
              response.data
            );

            if (!response.data.status) {
              console.log("Reach here");

              await otpProducer({
                tag: `<h1 style="color:blue;font-weight:800">${otp}</h1>`,
                email: req.body.email,
              });
            }
          } catch (error: any) {
            console.log("🚀 ~ AuthController ~ signup ~ error:", error);
            throw error;
          }
        }
      } else {
        console.log("last console - before signupProducer");
        try {
          await signupProducer(verificationLink);
          console.log("last console - after signupProducer");
        } catch (error: any) {
          console.error(
            "🚀 ~ AuthController ~ signup ~ signupProducer error:",
            error.message
          );
          throw new Error("Error in signupProducer");
        }
      }

      console.log("last console - before sending response");

      res.status(200).json({
        status: true,
        message: "Verification link sent",
        user: null,
      });

      console.log("last console - after sending response");
    } catch (error: Error | any) {
      console.error(
        "🚀 ~ AuthController ~ signup ~ general error:",
        error.message
      );
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      if (req.body.email === "admin@gmail.com") {
      }
      const user = await this.interactor.login(body, req.body.role);
      const token = generateToken({
        id: String(user._id),
        role: user.role as "user" | "admin" | "company",
      });
      res.cookie("access_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        secure: true,
        sameSite: "none",
        httpOnly: true,
      });

      res.status(200).json({ status: true, user, role: user.role, token });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ login ~ error:", error);

      next(error);
    }
  }

  async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("access_token");
      res
        .status(200)
        .json({ status: true, message: "Session cleared", user: null });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: payload = getPaylaod(req.params.token);
      const linkExpiry = await OtpSchema.findOne({ email: userData.email });
      if (!linkExpiry) {
        return res.status(400).json({
          status: false,
          message: "Your verification link is Expired",
        });
      }

      let user;
      if (userData.role === "user" || userData.role === "admin") {
        user = await this.interactor.signup({
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          password: userData.password,
          role: userData.role,
        });
        await userAddProducer(user);
      } else if (userData.role === "company") {
        user = await this.interactor.signup({
          email: userData.email,
          name: userData.name,
          password: userData.password,
          role: userData.role,
        });
        await companyAddProducer(user);
      } else {
        return res.status(400).json({
          status: false,
          message: "Invalid user role",
        });
      }

      const token = generateToken({ id: String(user._id), role: user.role });
      await OtpSchema.deleteOne({ email: user.email });
      res.cookie("access_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        secure: true,
        sameSite: "none",
        httpOnly: true,
      });

      res
        .status(200)
        .json({ status: true, user: user, message: "User signup successfull" });
    } catch (error) {
      console.log(error, " )");
      next(error);
    }
  }
  checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Rached here");
      console.log(req.cookies, "  **(");

      const token = req.cookies.access_token;
      console.log("🚀 ~ AuthController ~ checkRole ~ token:", token);
      console.log(req.cookies.access_token);
      if (!token) {
        throw new Error("Not Autherized");
      }
      const payload: { id: string; role: "admin" | "user" | "company" } =
        jwt.verify(token, String(process.env.JWT_KEY)) as {
          id: string;
          role: "admin" | "user" | "company";
        };
      res.status(200).json({ status: true, role: payload?.role, token });
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswordSendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const emailExist = await this.interactor.checkEmailExistforForgot(
        req.body.email as string
      );
      if (!emailExist) throw new Error(" Email not exist ");
      const token = generateEmailValidationToken({
        email: req.body.email,
        role: emailExist.role,
      });
      const mailLink = `${process.env.CLIENT_URL}/verify-forgot-mail/${token}/role=${req.body.role}`;
      await sendForgotMailLink(mailLink);
      res.cookie("forgot_key", token, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        sameSite: "none", // or 'lax' depending on your needs
        secure: true,
      });
      res
        .status(200)
        .json({ status: true, message: "Verification mail Sended" });
    } catch (error) {
      next(error);
    }
  }
  async checkForgotPassToken(req: Request, res: Response, next: NextFunction) {
    try {
      // forgot_key
      console.log("key))");

      const { token: bodyToken } = req.body;
      const token = req.cookies.forgot_key;
      if (!token) {
        throw new Error("Your Verification link in expired");
      }
      if (bodyToken !== token) throw new Error("Token not matching");
      res.status(200).json({ status: true, message: " token found " });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Calling ");
      const token = req.cookies.forgot_key;
      if (!token) throw new Error(" Your Verification link is Expired ");
      const { email } = jwt.verify(
        token,
        process.env.JWT_EMAIL_VALIDATION_KEY as string
      ) as { email: string };
      const { newPass } = req.body;
      console.log("🚀 ~ UserController ~ updatePassword ~ newPass:", newPass);
      const user = await this.interactor.updatePassword(newPass, email);
      await updatePassProducer({ id: user._id as string, newPass }, user.role);
      res.status(200).json({
        status: true,
        message: "Password changed ",
        changeStatus: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendMail(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(` resend api caaling 🎎🎍🎍🎍 ${JSON.stringify(req.body)}`);

      const emailInVerify = await OtpSchema.findOne({ email: req.body.email });
      if (!emailInVerify)
        throw new Error(`Your ${req.body.type} is Expired please Signup again`);
      if (req.body.type == "otp") {
        const otp = generateOTP();
        const otpExist = await OtpSchema.findOne({ email: req.body.email });
        await OtpSchema.updateOne(
          { email: req.body.email },
          { $set: { otp: otp, link: "" } },
          { upsert: true }
        );
        await otpProducer({
          tag: `<h1 style="color:blue;font-weight:800">${otp}</h1>`,
          email: req.body.email,
        });
      } else {
        const token = generateEmailValidationToken(req.body);
        let verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}/role=${req.body.role}`;
        await signupProducer(
          `<a href="${verificationLink}" style="width:200px;margin:auto;height:30px;background:blue;color:white;padding:5px;border-radius:5px">Verify Email</a>`
        );
      }
      res.status(200).json({
        status: true,
        message: "Verification link sended",
        user: null,
      });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ resendMail ~ error:", error);
      next(error);
    }
  }

  async chanagePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, currentpass, newpass } = req.body;
      const user = await this.interactor.changePassword(
        email,
        currentpass,
        newpass
      );
      res.json({ status: true, message: "Succesfull" });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("()()()(");
      const { email, otp } = req.body;
      console.log(req.body);
      const otpExist = await OtpSchema.findOne({ email: email });
      if (!otpExist)
        throw new Error("Your one time password not exist in our server");
      if (otp !== otpExist.otp) {
        throw new Error("Invalid Otp Please check again");
      }

      const userData = req.body.userData;
      let user;
      user = await this.interactor.signup({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        role: userData.role,
      });
      if (userData.role === "user" || userData.role === "admin") {
        await userAddProducer(user);
      } else if (userData.role === "company") {
        await companyAddProducer(user);
      } else {
        return res.status(400).json({
          status: false,
          message: "Invalid user role",
        });
      }
      const token = generateToken({ id: String(user._id), role: user.role });
      await OtpSchema.deleteOne({ email: user.email });
      res.cookie("access_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        secure: true,
        sameSite: "none",
        httpOnly: true,
      });

      res
        .status(200)
        .json({ status: true, user: user, message: "User signup successfull" });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ verifyOtp ~ error:", error);

      next(error);
    }
  }
}
