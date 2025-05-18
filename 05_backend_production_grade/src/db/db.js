import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
dotenv.config();
import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Mongod DB Connected !! DB HOst: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the app if connection fails
  }
};

export default connectDB;
