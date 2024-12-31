import express from "express";
import { createPost, deletePost, featurePost, getPost, getPosts, uploadAuth } from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.route("/")
    .get(getPosts) // Get all posts,
    .post(protectRoute, createPost);

// Get single post by slug
router.get("/:slug", increaseVisit, getPost);
// Delete a single post
router.delete("/:id", protectRoute, deletePost);

// Feature post
router.put("/feature", protectRoute, featurePost);

export default router;