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
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {}
  } catch (error) {}
};
// is student

// is Instructor
