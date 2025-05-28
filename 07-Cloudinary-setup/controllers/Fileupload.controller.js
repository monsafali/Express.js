const path = require("path");
const File = require("../models/File.Model");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(filetype, supportedTypes) {
  return supportedTypes.includes(filetype);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// Image upload Handlewr=
const imageuploader = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    // console.log(name, email, tags);

    const file = req.files.imageFile;
    // console.log(file);

    //  Validation krni hai
    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes))
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });

    // File formate

    const response = await uploadFileToCloudinary(file, "codehelp");
    console.log(response);
    // Db men entry save krni haai

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "image succesfuly uploaed ",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Someting went wrong ",
    });
  }
};

module.exports = { imageuploader, localFileUpload };
