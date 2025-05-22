import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

// Singup
const signup = async (req, res) => {
  try {
    // get data

    const { name, email, password, role } = req.body;

    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already exists" });
    }

    // Secure passwd
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashign password",
      });
    }
    // Create entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User Created successfuly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered, please try again later",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fil all the details carefuly",
      });
    }

    const user = await User.findOne({ email });
    // if not a registered user

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered",
      });
    }

    // verifty password & generate a JWT TOEKn
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    if (await bcrypt.compare(password, user.password)) {
      // if Password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Successfuly login",
      });
    } else {
      // Password not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};

export { signup, login };
