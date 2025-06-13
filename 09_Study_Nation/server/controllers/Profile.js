const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", gender, about = "", contactnumber } = req.body;
    // Get userId
    const id = req.user.id;
    // Validation
    if (!contactnumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    // Update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactnumber = contactnumber;
    await profileDetails.save();
    // return respone
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update profile, please try again",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // Get userId
    const id = req.user.id;
    // Delete user
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    await User.findByIdAndDelete(id);
    // return respone
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete user, please try again",
      error: error.message,
    });
  }
};

exports.getAlluserDetails = async (req, res) => {
  try {
    // Get userId
    const id = req.user.id;
    // Find user
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // return respone
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      userDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch user details, please try again",
      error: error.message,
    });
  }
};
