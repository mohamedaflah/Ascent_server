import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infra/database/mongodb/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./handlers/routers/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorHandler)

app.use("/", authRouter);

app.listen(process.env.AUTH_SERVICE_PORT, () =>
  console.log(`Authentication service started ${process.env.AUTH_SERVICE_PORT}`)
);
