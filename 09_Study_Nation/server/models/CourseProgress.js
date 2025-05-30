const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    completedVideo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);

const CourseProgress = mongoose.model("CourseProgress", CourseProgressSchema);
module.exports = CourseProgress;
