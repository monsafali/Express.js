import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/Auth.js";

// router.post("/login", login);
router.post("/signup", signup);
router.post("/login", login);

export default router;
