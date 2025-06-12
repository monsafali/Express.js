const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // Data Fetched
    const { sectionName, courseId } = req.body;
    // Data validatation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    // create section
    const newSection = await Section.create({ sectionName });
    // update course with section ObjectId
    const updateCourseDetail = Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Section Created successfuly",
      updateCourseDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section, please try again",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // Data input
    const { sectionName, sectionId } = req.body;
    // Data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    // update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    // return res
    return res.status(200).json({
      success: true,
      message: "section updated successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSEction = async (req, res) => {
  try {
    // Get Id
    const { sectionId } = req.params;
    // use findbyIdandDelete
    await Section.findByIdAndDelete(sectionId);
    // return respone
    return res.status(200).json({
      success: true,
      message: "Course section delete successfuly",
      error: error.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message,
    });
  }
};
