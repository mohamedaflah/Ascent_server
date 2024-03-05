import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import "./infra/mongodb/config";
import {
  runConsumer,
  stopConsumer,
} from "./infra/message_broker/kafka/consumers";
import userRouter from "./handlers/routers/userRouter";
import { checkAuthentication } from "./middlewares/checkAuthentication";
const app = express();
app.use(
  cors({
    origin: [String(process.env.CLIENT_URL)],
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());
app.use(checkAuthentication);
(async() => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    await stopConsumer();
  });
})();

app.use("/user",userRouter);
app.use(errorHandler);

app.listen(process.env.USER_SERVICE_PORT, () =>
  console.log(`user service started on  port  ${process.env.USER_SERVICE_PORT}`)
);
