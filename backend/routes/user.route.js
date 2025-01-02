import express from "express";
import { getUserPosts, getUserSavedPosts, savedPost } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/saved", protectRoute, getUserSavedPosts);

router.get("/my-posts", protectRoute, getUserPosts);

router.put("/save", protectRoute, savedPost);

export default router;