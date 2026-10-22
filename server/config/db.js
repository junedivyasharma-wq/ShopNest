import mongoose from "mongoose";

const connectDb=async()=>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
       console.log(`\n MongoDB connected !!, ${connectionInstance.connection.host}`);

    }catch(error){
        console.error("Error occurred while connecting to the database:", error);
        process.exit(1);
    }
}
export default connectDb;