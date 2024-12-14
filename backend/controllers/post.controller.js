import Post from "../models/post.model.js"

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
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.status(200).json(post);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    const post = await Post.findByIdAndDelete(id);
    res.status(200).json("Post has been deleted");
}