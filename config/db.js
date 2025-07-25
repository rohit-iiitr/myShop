import mongoose from "mongoose";

const connectDB = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected with server: ${conn.connection.host}`);

  } catch (error) {
    console.log(`Error in mongoDB is ${error}`)
  }
}

export default connectDB;