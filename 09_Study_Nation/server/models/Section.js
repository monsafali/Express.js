const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
    },
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;
