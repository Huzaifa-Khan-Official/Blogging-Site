import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userTitle: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
    },
    img: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: ""
    },
    savedPosts: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const User = model("User", userSchema);

export default User;