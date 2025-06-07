import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDB.js";
import router from "./routes/User.routes.js";
const Port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);

app.listen(Port, () => {
  connectDB();
  console.log(`server is start in port ${Port}`);
});
