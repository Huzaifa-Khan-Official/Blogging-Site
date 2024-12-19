import Post from "../models/post.model.js"
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

export const getPost = async (req, res) => {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    res.status(200).json(post);
}

export const createPost = async (req, res) => {
    const clerkUserId = req.auth.userId;

    console.log("clerk user Id ==>", clerkUserId);

    if (!clerkUserId) return res.status(401).json({ message: "Not Authenticated!" });

    const user = await User.findOne({ clerkUserId });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new Post({
        user: user._id,
        ...req.body
    });
    const post = await newPost.save();
    res.status(200).json(post);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) return res.status(401).json({ message: "Not Authenticated!" });

    const user = await User.findOne({ clerkUserId });

    const deletedPost = await Post.findOneAndDelete({
        _id: id,
        user: user._id,
    });

    if (!deletedPost) {
        return res.status(403).json({
            message: "You can delete only your posts!"
        });
    }

    res.status(200).json("Post has been deleted");
}