import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../model/User.model.js";

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // console.log("token is", token);
      // console.log("authorization is", authorization);
      // verifty Token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(userId);
      // Get User from Token
      req.user = await User.findById(userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(200).json({
        success: false,
        message: "failed to ",
      });
    }
  }
  if (!token) {
    res.status(200).json({
      success: false,
      message: "unathorized failed to ",
    });
  }
};

export default checkUserAuth;
