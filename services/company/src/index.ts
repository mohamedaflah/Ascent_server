import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
  })
);

app.use()

app.listen(process.env.COMPANY_SERVICE_PORT, () =>
  console.log(
    ` Company Service started at ${process.env.COMPANY_SERVICE_PORT} `
  )
);
