import dns from "node:dns";

import mongoose from "mongoose";
import  {DB_NAME}  from "../constant.js";
import 'dotenv/config';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectdb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(connect.connection.host);
        
    } catch (error) {
        console.log("Error in db folder: ",error);
        process.exit(1);
        
    }
}

connectdb()

export default connectdb;