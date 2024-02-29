import mongoose from "mongoose";

mongoose.connect(String(process.env.MONGODB_URI),{dbName:"Authentication"}).then(() => {
    console.log(` Auth Service Mongodb Connected Successfully!!! `);
}).catch(err=>{
    console.log(` Auth Service Mongodb Connection failed ${err} `);
})
