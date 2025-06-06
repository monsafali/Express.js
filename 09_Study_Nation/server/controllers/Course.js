const Course = require("../models/Course");
const Tags = require("../models/Tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//Create course handle funtion

exports.createCourse = async (req, res) => {
  try {
    // Fetch DAta
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    // Get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // Validation start

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    // check is instructor or not
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Insturctor detail is", instructorDetails);

    if (!instructorDetails) {
      res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    // Check given tag is valid or not
    const tagDetails = await Tags.findById(tag);
    if (!tagDetails) {
      res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    // upload Image to Cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // Create an entry for new Course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Add the new course to the user Schema of Instructor

    await User.findByIdAndUpdate();
  } catch (error) {
    return res.status(500).json({});
  }
};
