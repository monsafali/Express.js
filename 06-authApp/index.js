import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbconnect from "./config/database.js";
import router from "./routes/user.js";
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  dbconnect();

  console.log("App is ligint at ", PORT);
});
