const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
  try {
    const dbconnection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `db connection successful make ${dbconnection.connection.host}`
    );
  } catch (error) {
    console.log("Someting went wront error arrured", error);
    process.exit(1);
  }
};

module.exports = connectDb;
