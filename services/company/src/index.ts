import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./intfrastructure/database/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import companyRoute from "./handlers/router/companyRoute";
import {
  runConsumer,
  stopConsumer,
} from "./intfrastructure/messagebrokers/kafka/consumers";
import { errorHandler } from "./handlers/middlewares/errHandler";
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string,"https://ascent-pbzt.onrender.com","https://ascent-front-end.vercel.app"],
    credentials: true,
  })
);

(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    console.log("Stoping ");
    
    stopConsumer();
  });
})();
app.use("/api/company-service/", companyRoute);
app.use(errorHandler)

app.listen(process.env.COMPANY_SERVICE_PORT, () =>
  console.log(
    ` Company Service started at ${process.env.COMPANY_SERVICE_PORT} `
  )
);

// company 