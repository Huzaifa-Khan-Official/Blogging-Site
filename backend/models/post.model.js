import mongoose from "mongoose";

const { model, Schema } = mongoose;

const postSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String },
    isFeatured: { type: Boolean, default: false },
    visit: { type: Number, default: 0 },
}, { timestamps: true });

const Post = model("Post", postSchema);

export default Post;