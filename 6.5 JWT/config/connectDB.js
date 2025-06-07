import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connect sucesfuly", connectDB.connection.host);
  } catch (error) {
    console.log("Somethign went wrong", error);
  }
};

export default connectDB;
