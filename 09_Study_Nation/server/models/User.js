const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requiired: true,
      trim: true,
    },
    lastName: {
      type: String,
      requiired: true,
      trim: true,
    },
    email: {
      type: String,
      requiired: true,
      trim: true,
    },
    password: {
      type: String,
      requiired: true,
    },
    accountType: {
      type: String,
      requiired: true,
      enum: ["Admin", "Student", "Instructor"],
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    toke: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
