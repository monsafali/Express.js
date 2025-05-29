const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

// post middleware
FileSchema.post("save", async function (doc) {
  try {
    console.log("Doc", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emaijl
    let info = await transporter.sendMail({
      from: "Codehlpe",
      to: doc.email,
      subject: "New file upload on Cloudinary",
      html: `<h2>Hello ${doc.name} Your file is has been uploaded successfuly. <p> <a href="${doc.imageUrl}">See</a> </p></h2>`,
    });
    console.log(info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
