import connectdb from "./db/database.js";

console.log(connectdb);














// import { DB_NAME } from "./constant.js";
// import mongoose from 'mongoose';
// import express from 'express';

// const app = express();




// ( async () => {

//      try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//         app.on("error", (error : Error) => {

//             console.log("Error: ",error);

//         })


//         app.listen(process.env.PORT, () => {

//             console.log(`server s listening on ${process.env.PORT}`);
            
//         })
//     }
            

        
//      catch (error) {
//         console.error('Error: ',error)
//     }



//    })()