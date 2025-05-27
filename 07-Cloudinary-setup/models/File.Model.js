const mongoose = require("mongoose");

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

const File = mongoose.model("File", FileSchema);
module.exports = File;
