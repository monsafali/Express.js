import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (loadFilePath) => {
  try {
    if (!loadFilePath) return null;
    // upload the file on cloudinary
    const respone = await cloudinary.uploader.upload(loadFilePath, {
      resource_type: "auto",
    });
    // File has been upload succesfuly
    console.log("file is uploaded on cloudinary succesfuly", respone.url);
    return respone;
  } catch (error) {
    fs.unlink(loadFilePath); //remove the localy saved temporary file as the upload operation got failed
    return null;
  }
};
