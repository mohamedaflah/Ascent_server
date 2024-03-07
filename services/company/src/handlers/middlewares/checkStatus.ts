import { NextFunction, Request, Response } from "express";
import { getPayload } from "../../utils/getPayload";
import companyModel from "../../intfrastructure/database/models/companyModel";

export const checkStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error("token not found");
    }
    const data = getPayload(token);
    if (data) {
      const companyData = await companyModel.findOne({ _id: data?.id });
      if (!companyData) {
        throw new Error(" company not found ");
      }
      if (companyData.approvelStatus?.status === "Pending") {
        return res.status(200).json({
          status: true,
          role: "company",
          message: " Your request not responed admin wait ",
          approvelStatus:"Pending",
          user:companyData
        });
      }
      if (companyData.approvelStatus?.status === "Rejected") {
        return res.status(200).json({
          status: true,
          role: "company",
          message: " Your request has been rejected admin ",
          user:companyData
        });
      }
      next();
    } else {
      throw new Error(" something went wrong");
    }
  } catch (error) {
    next(error);
  }
};
