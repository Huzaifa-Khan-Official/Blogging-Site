import express from "express";
import { createPost, deletePost, featurePost, getPost, getPosts, updatePost, uploadAuth } from "../controllers/post.controller.js";
import increaseVisit from "../middleware/increaseVisit.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { rateLimiter } from "../lib/rateLimiter.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.route("/")
    .get(getPosts)
    .post(protectRoute, rateLimiter(5 * 60 * 1000, 5, "Too many requests to handle. Please try again after 5 minitues"), createPost);

// Get single post by slug
router.route("/:slug")
    .get(increaseVisit, getPost);

// Delete/Update a single post
router.route("/:id")
    .delete(protectRoute, rateLimiter(5 * 60 * 1000, 5, "Too many requests to handle. Please try again after 5 minitues"), deletePost)
    .put(protectRoute, rateLimiter(5 * 60 * 1000, 5, "Too many requests to handle. Please try again after 5 minitues"), updatePost);

// Feature post
router.put("/feature", protectRoute, rateLimiter(5 * 60 * 1000, 5, "Too many requests to handle. Please try again after 5 minitues"), featurePost);

export default router;