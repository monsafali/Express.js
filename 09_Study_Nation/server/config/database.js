const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = async () => {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongo db succesfuly conted at ${mongoConnection.connection.host}`
    );
  } catch (error) {
    console.log("something went wrong", error);
    process.exit(1);
  }
};

module.exports = dbconnect;
