import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/Auth.js";

import { auth, isStudent, isAdmin } from "../middleware/Auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected router for testing",
  });
});
// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected router for students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected router for admin",
  });
});

export default router;
