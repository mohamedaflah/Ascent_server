import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";

const AUTH_SERVICE = "http://localhost:3000/";
const COMMUNICATION_SERVICE = "http://localhost:8000/";
const JOB_SERVICE = "http://localhost:5005/";
const NOTIFICATION_SERVICE = "http://localhost:3003/";
const USER_SERVICE = "http://localhost:5000/";
const COMPANY_SERVICE = "http://localhost:5001/";

const app: Application = express();
const PORT: number = Number(process.env.PORT || 9004);

const CLIENT_URL = "http://localhost:5173";
const RENDER_URL = "https://ascent-pbzt.onrender.com";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [String(CLIENT_URL), "https://ascent-pbzt.onrender.com", "https://ascent-front-end.vercel.app/"],
    credentials: true,
  })
);

app.use("/auth", proxy(AUTH_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to AUTH_SERVICE:", err);
  },
}));

app.use("/communication", proxy(COMMUNICATION_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to COMMUNICATION_SERVICE:", err);
  },
}));

app.use("/job", proxy(JOB_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to JOB_SERVICE:", err);
  },
}));

app.use("/user", proxy(USER_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to USER_SERVICE:", err);
  },
}));

app.use("/company", proxy(COMPANY_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to COMPANY_SERVICE:", err);
  },
}));

app.use("/notification", proxy(NOTIFICATION_SERVICE, {
  proxyErrorHandler: (err, res) => {
    console.error("Error proxying to NOTIFICATION_SERVICE:", err);
  },
}));

app.listen(PORT, () => console.log(`Gateway Running at ${PORT}`));
