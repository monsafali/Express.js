// const File = require("../models/File.Model");

// const localFileUpload = async (req, res) => {
//   try {
//     const file = req.files.file;
//     console.log("file agye hai", file);

//     let path = __dirname + "/file" + Date.now() + `.${file.name.split(".")[1]}`;
//     console.log("PAth is", path);

//     file.mv(path, (err) => {
//       console.log(err);
//     });

//     res.json({
//       success: true,
//       message: "Local File UPload Successfuly ",
//     });
//   } catch (error) {
//     console.log("something went wrong", error);
//   }
// };

// module.exports = localFileUpload;

const path = require("path");
const fs = require("fs");

const localFileUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const file = req.files.file;
    console.log("file agya hai", file.name);

    const uploadDir = path.join(__dirname, "../files");

    // Make sure 'files' directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a full file path with extension
    const fullPath = path.join(
      uploadDir,
      `${Date.now()}.${file.name.split(".")[1]}`
    );
    console.log("Path is", fullPath);

    file.mv(fullPath, (err) => {
      if (err) {
        console.error("Error while moving file:", err);
        return res
          .status(500)
          .json({ success: false, message: "File upload failed" });
      }

      res.json({
        success: true,
        message: "Local File Upload Successfully",
        filePath: fullPath,
      });
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = localFileUpload;
