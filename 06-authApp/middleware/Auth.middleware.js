//auth isStudent, isAdmin
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    // Extract JWT token
    // Pending : others ways to fetch token
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong , while verifying the token",
    });
  }
};

const isStudent = (req, res) => {
  try {
    if (req.user.role !== "Student") {
      res.status(401).json({
        success: false,
        message: "This is a protecte for rout student",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

const isAdmin = (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      res.status(401).json({
        success: false,
        message: "This is a protecte for rout Admin",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

export { auth, isStudent, isAdmin };
