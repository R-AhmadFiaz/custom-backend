import 'dotenv/config';
import connectdb from "./db/database.js";
import {app} from './app.js';



connectdb()
.then(() => {
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on ${process.env.PORT || 3000}`);
    
}) 

server.on('error', (error: Error) => {
    console.error('Error in index.ts on(): ',error);
    
})})
.catch((error) => {
    console.log('Error in indexJS catch: ',error);
    
})







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
