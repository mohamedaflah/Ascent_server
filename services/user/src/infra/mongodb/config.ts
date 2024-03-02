import mongoose from "mongoose";

mongoose
  .connect(String(process.env.MONGODB_URI), { dbName: "user-service" })
  .then(() => {
    console.log(` User service db connected`);
  })
  .catch((e) => {
    console.log(` Mongodb connection failed ${e}`);
  });
