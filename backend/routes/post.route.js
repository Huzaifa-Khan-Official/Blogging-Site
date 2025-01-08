import express from "express";
import { createPost, deletePost, featurePost, getPost, getPosts, updatePost, uploadAuth } from "../controllers/post.controller.js";
import increaseVisit from "../middleware/increaseVisit.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.route("/")
    .get(getPosts) // Get all posts,
    .post(protectRoute, createPost);

// Get single post by slug
router.route("/:slug")
    .get(increaseVisit, getPost);

// Delete/Update a single post
router.route("/:id")
    .delete(protectRoute, deletePost)
    .put(protectRoute, updatePost);

// Feature post
router.put("/feature", protectRoute, featurePost);

export default router;