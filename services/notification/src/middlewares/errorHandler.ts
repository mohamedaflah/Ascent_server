import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message, " ERR");

  res.status(500).json({ message: err.message, status: false });
};
