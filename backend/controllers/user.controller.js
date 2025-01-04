import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;


    try {
        if (!user?.savedPosts) {
            return res.status(200).json([]);
        }

        const posts = await Post.find({ _id: { $in: user.savedPosts } })
            .populate("user", "username")
            .limit(limit)
            .skip((page - 1) * limit);

        const totalPosts = await Post.countDocuments({ _id: { $in: user.savedPosts } });
        const hasMore = page * limit < totalPosts;

        res.status(200).json({ posts, hasMore });
    } catch (error) {
        console.log("error ==>", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const posts = await Post.find({ user: userId })
            .populate("user", "username")
            .limit(limit)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit);


        const totalPosts = await Post.countDocuments({ user: userId });
        const hasMore = page * limit < totalPosts;

        res.status(200).json({ posts, hasMore });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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

        return res.status(200).json(isSaved);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};