import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infra/database/mongodb/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./handlers/routers/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { runConsumer, stopConsumer } from "./infra/message/kafka/consumers";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    console.log(` ^^^ stoping ^^^`);
    await stopConsumer();
  });
})();
app.use("/", authRouter);
app.use(errorHandler);
app.listen(process.env.AUTH_SERVICE_PORT, () =>
  console.log(
    ` Authentication service started ${process.env.AUTH_SERVICE_PORT} `
  )
);
