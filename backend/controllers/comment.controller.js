import Comment from "../models/comment.model.js"
import User from "../models/user.model.js";


export const getPostComments = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId }).populate("user", "username img").sort({ createdAt: -1 });
    res.json(comments);
}

export const createComment = async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
        user: user._id,
        post: postId,
        ...req.body
    });

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteComment = async (req, res) => {
    const userId = req.user._id;
    const id = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.role || "user";

    if (role == "admin") {
        await Comment.findByIdAndDelete(id);

        return res.json({ message: "Comment deleted!" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const deletedComment = await Comment.findOneAndDelete({ _id: id, user: user._id });

        if (!deletedComment) {
            return res.status(404).json({ message: "You can only dlete only your comment!" });
        }

        res.json({ message: "Comment deleted!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const deleteCommentFromBlog = async (req, res) => {
    try {
        const { postId } = req.body;

        await Comment.deleteMany({ post: postId });
        res.json({ message: "Comments deleted from this blog!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}