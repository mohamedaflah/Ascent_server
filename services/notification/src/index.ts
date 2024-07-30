import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middlewares/errorHandler";
import {
  runConsumer,
  stopConsumer,
} from "./infra/messageborker/kafka/consumers";
import { NotificaionConsumerActions } from "./infra/messageborker/kafka/consumers/consumerActions";

const app = express();

app.use(errorHandler);
(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    await stopConsumer();
  });
})();
const consumer = new NotificaionConsumerActions();
app.post("/api/auth-service/send-otp", async(req, res) => {
  const { data } = req.body;
  await consumer.sendVerificationOtp(data);
  return res.status(200).json({ status: true, message: "otp sended" });
});

app.listen(process.env.NOTIFICATION_SERVICE_PORT, () =>
  console.log(
    ` _Notification service started ${process.env.NOTIFICATION_SERVICE_PORT}`
  )
);

// notification service
