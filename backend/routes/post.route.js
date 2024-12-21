import express from "express";
import { createPost, deletePost, getPost, getPosts, uploadAuth } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.route("/")
    .get(getPosts) // Get all posts,
    .post(createPost); // create a new post

// Get single post by slug
router.get("/:slug", getPost);
// Delete a single post
router.delete("/:id", deletePost);

export default router;