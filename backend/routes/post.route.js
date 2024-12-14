import express from "express";
import { createPost, deletePost, getPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/")
    .get(getPosts) // Get all posts,
    .post(createPost); // create a new post

// Get single post by slug
router.get("/:slug", getPost);
// Delete a single post
router.delete("/:id", deletePost);

export default router;