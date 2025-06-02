const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// auth

exports.auth = async (req, res, next) => {
  try {
    // Extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");
    // if token mising then retunr respone
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        sucess: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Something went wrong while validation the token",
    });
  }
};
// is student

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Thi sis a protected router for Studnet only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// is Instructor

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Thi sis a protected router for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// is admin

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Thi sis a protected router for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
