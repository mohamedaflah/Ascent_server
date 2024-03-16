import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "job_service" })
  .then(() => {
    console.log(` Job service db connected `);
  })
  .catch((err) => {
    console.log(` Erro during mongodb connection in Job service ${err}`);
  });
