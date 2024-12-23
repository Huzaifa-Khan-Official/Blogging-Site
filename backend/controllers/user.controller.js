import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user?.savedPosts) {
            return res.status(200).json([]);
        }

        return res.status(200).json(user?.savedPosts);
    } catch (error) {
        console.log("error ==>", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const savedPost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { postId } = req.body;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ clerkUserId });

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

        setTimeout(() => {
            return res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
        }, 3000);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};