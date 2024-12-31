import express from "express";
import { checkAuth, googleSignup, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/google-signup", googleSignup);

router.post("/login", login);

router.put("/update-profile", protectRoute, updateProfile)

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;