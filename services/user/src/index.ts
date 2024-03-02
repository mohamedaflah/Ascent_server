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
const app = express();

(async() => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    await stopConsumer();
  });
})();
app.use(cookieParser());
app.use(
  cors({
    origin: [String(process.env.CLIENT_URL)],
    credentials: true,
  })
);

app.use("/user");
app.use(errorHandler);

app.listen(process.env.USER_SERVICE_PORT, () =>
  console.log(`user service started on  port ${process.env.USER_SERVICE_PORT}`)
);
