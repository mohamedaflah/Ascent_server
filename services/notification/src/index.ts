import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(errorHandler);
app.use(express.json())




app.listen(process.env.NOTIFICATION_SERVICE_PORT, () =>
  console.log(
    ` _Notification service started ${process.env.NOTIFICATION_SERVICE_PORT}`
  )
);
