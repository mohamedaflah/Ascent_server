import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/errorHandler";
import {
  runConsumer,
  stopConsumer,
} from "./infra/messageborker/kafka/consumers";

const app = express();

app.use(errorHandler);
(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    await stopConsumer();
  });
})();
app.use(express.json());

app.listen(process.env.NOTIFICATION_SERVICE_PORT, () =>
  console.log(
    ` _Notification service started ${process.env.NOTIFICATION_SERVICE_PORT}`
  )
);
