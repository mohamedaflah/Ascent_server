import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../interfaces/interactor_interface/IUserinteractor";
import jwt from "jsonwebtoken";
import { updateUserProducer } from "../../infra/message_broker/kafka/producers/updateUser";
import axios from "axios";
import UserSchema from "../../infra/mongodb/Schema/UserSchema";
export class UserController {
  private userInteractor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.userInteractor = interactor;
  }
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.access_token;
      console.log(req.cookies);
      
      console.log("🚀 ~ UserController ~ getUserData ~ token:", token);
      const payload: { id: string; role: "user" | "admin" | "company" } =
        jwt.verify(token, String(process.env.JWT_KEY)) as {
          id: string;
          role: "user" | "admin" | "company";
        };
      const user = await this.userInteractor.getUserData(payload?.id);
      console.log("🚀 ~ UserController ~ getUserData ~ user:", user);
      res
        .status(200)
        .json({ status: true, user, message: "Success!!", role: user.role });
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
      const user = await this.userInteractor.updatePassword(newPass, email);
      res.status(200).json({
        status: true,
        message: "Password changed ",
        changeStatus: true,
      });
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

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userInteractor.updateProfile(
        req.params.userId,
        req.body
      );
      console.log("😀😀😀😀😀😀😀😀😀",req.body);

      await updateUserProducer(user._id as string, user);
      await axios.post(
        `${String(
          process.env.JOB_SERVICE_URL
        )}/api/job-service/api/v1/add-user`,
        { ...user }
      );
      // /api/communication-service/api/v2
      await axios.post(
        `${String(
          process.env.COMPANY_SERVICE_URL
        )}/api/communication-service/api/v2/add-user`,
        { ...user }
      );
      res.status(200).json({
        status: true,
        user,
        message: "Success!!",
        role: user.role,
        id: user._id,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllusres(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userInteractor.getAllusers();

      res.status(200).json({ status: true, message: "Succesfull!", users });
    } catch (error) {
      next(error);
    }
  }

  async saveNewJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobId, userId }: { jobId: string; userId: string } = req.body;
      const { type } = req.query;
      const user = await UserSchema.findOne({ _id: userId });
      let message = "";
      if (user) {
        if (type == "add") {
          user.savedJobs.push(jobId);
          message = "job saved";
        } else {
          user.savedJobs = user.savedJobs.filter((val) => val != jobId);
          message = "job deleted";
        }
        await user.save();
      }

      res
        .status(200)
        .json({ status: true, message: message, savedjobs: user?.savedJobs });
    } catch (error) {
      next(error);
    }
  }
}
