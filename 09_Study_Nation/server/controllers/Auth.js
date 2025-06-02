const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Generate OTP
exports.sendOtp = async (req, res) => {
  try {
    // Fetch email from req body
    const { email } = req.body;
    // Check if user already exist
    const checkUserPresent = await User.findOne({ email });
    // if user already exist then return a respone
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    // otp generator
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(`Otp Generate `, otp);

    // Check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const result = await OTP.findOne({ otp: otp });
    }

    const otpPlayload = { email, otp };
    // Create a an entry for OTP

    const optBody = await OTP.create(otpPlayload);
    conso.log(optBody);

    res.status(200).json({
      success: true,
      message: "otp send Sucessfuly",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Singup

exports.signUp = async (req, res) => {
  try {
    // Data Fetch from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    // Validate kro

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // 2 password match krlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm Password value does nto match, pleas try again",
      });
    }
    // Check user already exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
    // find most recend OTP for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(`Recent opt is ${recentOtp}`);
    // validate OTP
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP NOT FOUND",
      });
    } else if (otp !== recentOtp.otp) {
      // invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash Password
    const hashpassword = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Entry create in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashpassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${lastName}`,
    });

    // Return Res
    return res.status(200).json({
      success: true,
      message: "User is registered succesfuly",
      user,
    });
  } catch (error) {
    conso.log(err);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registe please register it",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // Get Data from req body
    const { email, password } = req.body;

    // Validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field are requied please try again",
      });
    }

    // User Check is exist or not
    const user = await User.findOne({ email }).populate("additionDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is niot register please signup first",
      });
    }

    // if user is right then generate JWT after match password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expireIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfuly",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};
// Change password

exports.changePassword = async (req, res) => {
  // Get data from req boyd
  // Get oldPassword, newPassword, confirmNewPassword
  // Validation on it
  // update password update in Database
  // Send mail - password updated successuly
  // return respone
};
