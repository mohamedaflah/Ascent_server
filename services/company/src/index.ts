import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();




app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  })
);

app.use(cookieParser());
