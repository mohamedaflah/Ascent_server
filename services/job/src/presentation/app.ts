import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./handlers/routers/jobRouter";
import { errorHandler } from "./middlewares/errorHandler";
import categoryRoute from "./handlers/routers/categoryRoute";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", router);
app.use("/api/category", categoryRoute);
app.use(errorHandler);
app.listen(process.env.JOB_SERVICE_PORT, () => {
  console.log("Job service started at port " + process.env.JOB_SERVICE_PORT);
  console.log(`
       _       _                           _          
      | |     | |                         (_)         
      | | ___ | |__    ___  ___ _ ____   ___  ___ ___ 
  _   | |/ _ \| '_ \  / __|/ _ \ '__\ \ / / |/ __/ _ \
 | |__| | (_) | |_) | \__ \  __/ |   \ V /| | (_|  __/
  \____/ \___/|_.__/  |___/\___|_|    \_/ |_|\___\___|
                                                   
  `);
});
