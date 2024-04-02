import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGODB_URI as string,{dbName:"communication_service"})
  .then(() => {
    console.log(`Mongodb Connected`);
  })
  .catch((err) => console.log(` Error in mongodb connection ${err}`));
