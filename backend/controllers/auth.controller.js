import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({
            message: "Email already exists"
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "",
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                message: "Signup Successfully",
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: user.role,
                    img: newUser.img ? newUser.img : ""
                }
            })
        } else {
            res.status(400).json({
                message: "Invalid user data."
            });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const googleSignup = async (req, res) => {
    const { username, email, img, isVerified } = req.body;
    try {

        if (!username || !email || !img || !isVerified) {
            return res.status(400).json({
                message: "Please provide all required fields"
            })
        }

        const user = await User.findOne({ email });

        if (user) {
            generateToken(user._id, res);
            res.status(201).json({
                message: "Login Successfully",
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    img: user.img,
                    isVerified: user.isVerified,
                }
            })
        }

        const newUser = new User({
            username,
            email,
            img,
            isVerified
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                message: "Signup Successfully",
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: user.role,
                    img: newUser.img ? newUser.img : ""
                }
            })
        } else {
            res.status(400).json({
                message: "Invalid user data."
            });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isPassowrdCorrect = await bcrypt.compare(password, user.password);

        if (!isPassowrdCorrect) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        
        generateToken(user._id, res);

        return res.json({
            message: "Login successful",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                img: user.img ? user.img : "F",
            },
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }

}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile pic is required",
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
