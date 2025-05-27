const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const fileUpload = require("express-fileupload");
const connectDb = require("./config/database");
const connetCloud = require("./config/cloudinary");
const upload = require("./routes/Fileupload");

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connetCloud();

app.use("/api/v1/upload", upload);

app.listen(port, () => {
  connectDb();
  console.log("Server started successfully at port", port);
});
