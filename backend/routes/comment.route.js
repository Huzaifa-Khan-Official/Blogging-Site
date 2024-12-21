import express from "express";
import { createComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/:postId")
    .get(getPostComments)
    .post(createComment);

router.delete("/:id", deleteComment);

export default router;