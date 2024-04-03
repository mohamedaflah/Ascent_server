import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();
import chatRouter from "./handlers/routers/chatRoute";
import messageRouter from "./handlers/routers/messageRoute";
const app: Application = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", chatRouter);
app.use("/api/v2", messageRouter);
app.use(errorHandler);
export const server = app.listen(process.env.COMMUNICATION_SERVICE_PORT, () =>
  console.log(
    `Communication service running with ${process.env.COMMUNICATION_SERVICE_PORT}`
  )
);
