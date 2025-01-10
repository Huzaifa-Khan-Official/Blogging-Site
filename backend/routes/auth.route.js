import express from "express";
import { checkAuth, googleSignup, login, logout, resendOTP, signup, updateProfile, verifyOTP } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/google-signup", googleSignup);

router.post("/login", login);

router.put("/updateProfile", protectRoute, updateProfile);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.post("/verifyOTP", protectRoute, verifyOTP);

router.post("/resendOTP", protectRoute, resendOTP);

export default router;