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

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      String(process.env.CLIENT_URL),
      "https://ascent-pbzt.onrender.com",
    ],
    credentials: true,
  })
);

(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();

app.use("/api/user-service/user", userRouter);

app.use(errorHandler);

app.listen(process.env.USER_SERVICE_PORT, () =>
  console.log(
    `(user service) started on  port  ${process.env.USER_SERVICE_PORT}`
  )
);
// uer service