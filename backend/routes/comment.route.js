import express from "express";
import { createComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/:postId")
    .get(getPostComments)
    .post(protectRoute, createComment);

router.delete("/:id", protectRoute, deleteComment);

export default router;