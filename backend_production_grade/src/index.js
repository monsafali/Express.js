import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/db.js";
import { app } from "./app.js";
const port = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is runign at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("mogo db connection failed !!", err);
  });
