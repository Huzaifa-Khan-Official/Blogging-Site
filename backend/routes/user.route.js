import express from "express";
import { getUserSavedPosts, savedPost } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/saved", protectRoute, getUserSavedPosts);
router.put("/save", protectRoute, savedPost);

export default router;