import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  try {
    const dbconnect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "Db connection successfuly established at",
      dbconnect.connection.host
    );
  } catch (error) {
    console.log("DB Connection Issues");
    console.error(error);
    process.exit(1);
  }
};

export default dbconnect;
