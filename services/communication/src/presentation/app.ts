import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.listen(process.env.COMMUNICATION_SERVICE_PORT, () =>
  console.log(
    `Communication service running with ${process.env.COMMUNICATION_SERVICE_PORT}`
  )
);
