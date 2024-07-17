import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infra/database/mongodb/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./handlers/routers/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { runConsumer, stopConsumer } from "./infra/message/kafka/consumers";
import otpRouter from "./handlers/routers/otpRouter";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [String(process.env.CLIENT_URL),"https://ascent-pbzt.onrender.com","https://ascent-front-end.vercel.app"],
    credentials: true,
  })
);
(async () => {
  await runConsumer();
  process.on("SIGTERM", async () => {
    console.log(` ^^^ stoping ^^^`);
    stopConsumer();
  });
})();

app.use("/api/auth-service", authRouter);
app.use("/api/auth-service/otp", otpRouter);
app.use(errorHandler);
app.listen(process.env.AUTH_SERVICE_PORT, async () => {
  console.log(
    ` Authentication service started ${process.env.AUTH_SERVICE_PORT} `
  );
});

// auth service