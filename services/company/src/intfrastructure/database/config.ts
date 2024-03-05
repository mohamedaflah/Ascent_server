import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "Company" })
  .then(() => {
    console.log(`Company service db connected`);
  })
  .catch((err) => {
    console.log(`Company service db failed due to ${err}`);
  });
