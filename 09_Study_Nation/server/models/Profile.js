const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    contactnumber: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
