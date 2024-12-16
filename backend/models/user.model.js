import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    savedPosts: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const User = model("User", userSchema);

export default User;