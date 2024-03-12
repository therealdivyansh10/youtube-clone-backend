// require('dotenv').config({path:'./env'})

import mongoose, { mongo } from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './env'
})


connectDB();



// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error", () => {
//             console.log("ERR: ",error);
//             throw err
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port  ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("ERROR: ",error);
//         throw err
//     }
// })();
