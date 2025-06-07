import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import transporter from "../config/emailconfig.js";
dotenv.config();

const Signup = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    res.status(404).json({
      success: false,
      message: "user Already exist on db",
    });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const doc = new User({
          name: name,
          email: email,
          password: hashPassword,
          tc: tc,
        });
        const savedUser = await doc.save();
        // const savedUser = await User.findOne({ email: email });

        // Generate JWT TOKEN
        const token = jwt.sign(
          { userId: savedUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );
        console.log(token);

        res.status(200).json({
          success: true,
          message: "user successfuly  registered with token",
          token: token,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Password all confirm password not matched",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "All Fields are required please fill all entries",
      });
    }
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found on this email",
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          res.status(200).json({
            success: false,
            message: "User Successfuly login",
          });
        } else
          res.status(404).json({
            success: false,
            message: "UserName or Email not matched",
          });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Please Enter Username & email",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const changepassword = async (req, res) => {
  const { password, password_confirmation } = req.body;
  if (password && password_confirmation) {
    if (password !== password_confirmation) {
      res.status(404).json({
        success: false,
        message: "Password not matched",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newhashPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.user._id, {
        $set: { password: newhashPassword },
      });
      res.status(200).json({
        success: false,
        message: "password change successfuly",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "All fied required",
    });
  }
};

const loggedUser = async (req, res) => {
  res.send({ user: req.user });
};

const sendUserPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "15m",
      });
      const link = `http://127.0.0.1:3000/api/user/forgotpassword/${user._id}/${token}`;
      console.log(link);

      // Send Email
      let info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: "From monsaf kamal",
        html: `<a href=${link}>Click her </a> To Reset to reset your password`,
      });
      res.status(200).json({
        success: true,
        message: "Reset Email Successfuly sened on your email",
        info: info,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Email is Does Not Exist",
      });
    }
  } else {
    res.status(404).json({
      success: true,
      message: "Email is required",
    });
  }
};

const userPasswordReset = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { id, token } = req.params;
  const user = await User.findById(id);

  const new_secret = user._id + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, new_secret);
    if (password && password_confirmation) {
      if (password == password_confirmation) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set: { password: hashPassword },
        });
        res.status(200).json({
          success: true,
          message: "Password reset successfuly",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Password & password confimration not matched",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "both filed are required",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export {
  Signup,
  Login,
  changepassword,
  loggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
};
