import express from "express";
import {
  Signup,
  Login,
  changepassword,
  loggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
} from "../controllers/User.controller.js";

import checkUserAuth from "../middleware/auth-middleware.js";

const router = express.Router();
router.use("/changepassword", checkUserAuth);
router.use("/loggedUser", checkUserAuth);

// Route lvel middle wat to protet rout

router.post("/register", Signup);
router.post("/login", Login);
router.post("/forgotpassword", sendUserPasswordResetEmail);
router.post("/resetpassword/:id/:token", userPasswordReset);

// Change password
router.post("/changepassword", changepassword);
router.get("/loggedUser", loggedUser);

export default router;
