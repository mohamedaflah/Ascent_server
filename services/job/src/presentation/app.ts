import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./handlers/routers/jobRouter";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", router);
app.use(errorHandler)
app.listen(process.env.JOB_SERVICE_PORT, () =>
  console.log("Job service started at port " + process.env.JOB_SERVICE_PORT)
);
