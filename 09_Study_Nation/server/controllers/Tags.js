const Tags = require("../models/Tags");

// Creat Tag the handler funtion

exports.createTag = async (req, res) => {
  try {
    // Fetch Data
    const { name, description } = req.body;

    // Validation krlo
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Create entry in db
    const tagDetails = await Tags.create({
      name: name,
      description: description,
    });
    console.log("Detail of tag", tagDetails);
    return res.status(200).json({
      success: true,
      message: "Tag created successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAlltags = async (req, res) => {
  try {
    const alltags = await Tags.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All tags return successfuly",
      alltags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
