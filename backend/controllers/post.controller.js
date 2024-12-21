import ImageKit from "imagekit";
import Post from "../models/post.model.js"
import User from "../models/user.model.js";
import serverConfig from "../Configurations/server.config.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

export const getPost = async (req, res) => {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    res.status(200).json(post);
}

// export const createPost = async (req, res) => {
//     try {
//         const clerkUserId = req.auth.userId;

//         if (!clerkUserId) {
//             return res.status(401).json("Not authenticated!");
//         }

//         const user = await User.findOne({ clerkUserId });

//         if (!user) {
//             return res.status(404).json("User not found!");
//         }

//         let slug = req.body.title.replace(/ /g, "-").toLowerCase();

//         let existingPost = await Post.findOne({ slug });

//         let counter = 2;

//         while (existingPost) {
//             slug = `${slug}-${counter}`;
//             existingPost = await Post.findOne({ slug });
//             counter++;
//         }

//         const newPost = new Post({ user: user._id, slug, ...req.body });

//         let post;
//         try {
//             post = await newPost.save();
//         } catch (error) {
//             console.error("Error during save:", error.message);
//             return res.status(400).json({ message: "Failed to save post", error: error.message });
//         }

//         res.status(200).json(post);
//     } catch (error) {
//         console.error("Unexpected error:", error.message);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

export const createPost = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId;

        if (!clerkUserId) {
            return res.status(401).json("Not authenticated!");
        }

        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.status(404).json("User not found!");
        }

        // Generate base slug from title
        const baseSlug = req.body.title.replace(/ /g, "-").toLowerCase();

        // Initialize slug with base slug
        let slug = baseSlug;

        // Check for existing posts with the same slug
        let existingPost = await Post.findOne({ slug });

        let counter = 2;

        // Generate unique slug if conflict exists
        while (existingPost) {
            slug = `${baseSlug}-${counter}`;
            existingPost = await Post.findOne({ slug });
            counter++;
        }

        // Create and save new post
        const newPost = new Post({ user: user._id, slug, ...req.body });

        let post;
        try {
            post = await newPost.save();
        } catch (error) {
            console.error("Error during save:", error.message);
            return res.status(400).json({ message: "Failed to save post", error: error.message });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Unexpected error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


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

const imagekit = new ImageKit({
    urlEndpoint: serverConfig.image_kit_url_endpoint,
    publicKey: serverConfig.image_kit_public_key,
    privateKey: serverConfig.image_kit_private_key,
})

export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}