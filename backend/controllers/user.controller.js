import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
    const userId = req.user._id;


    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user?.savedPosts) {
            return res.status(200).json([]);
        }

        const savedPosts = await Post.find({ _id: { $in: user.savedPosts } }).populate("user", "username");

        return res.status(200).json(savedPosts);
    } catch (error) {
        console.log("error ==>", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const savedPost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findById(userId);

        const isSaved = user.savedPosts.some((p) => p === postId);

        if (!isSaved) {
            await User.findByIdAndUpdate(user._id, {
                $push: { savedPosts: postId }
            });
        } else {
            await User.findByIdAndUpdate(user._id, {
                $pull: { savedPosts: postId }
            });
        }

        return res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};