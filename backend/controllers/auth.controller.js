import { sendEmail } from "../lib/mail.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import UserOTP from "../models/userOTP.model.js";

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
            role: "user",
            img: "",
            isVerified: false,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            await sendEmail({ _id: newUser._id, email: newUser.email, username: newUser.username }, res);

            res.status(201).json({
                message: "Signup Successfully",
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    img: newUser.img,
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
    const { username, email, isVerified } = req.body;
    try {

        if (!username || !email || !isVerified) {
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
                    role: user.role
                }
            })
        }

        const newUser = new User({
            username,
            email,
            isVerified,
            role: "user",
            img: "",
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
                    role: newUser.role,
                    img: newUser.img,
                }
            })
        } else {
            res.status(400).json({
                message: "Invalid user data."
            });
        }
    } catch (error) {
        console.log("Error in google signup/login controller", error.message);
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
                img: user.img ? user.img : "",
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
        const { username, img, title } = req.body;

        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { img, username, title },
            { new: true }
        );

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            img: updatedUser.img,
            title: updatedUser.title,
        });
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

export const verifyOTP = async (req, res) => {
    try {
        let { userId, otp } = req.body;

        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        } else {
            const verificationResponse = await UserOTP.find({
                userId
            })

            if (verificationResponse.length <= 0) {
                throw Error("Account record does'nt exit or has been verified already. Please sign up or log in.");
            } else {
                const { expiresAt } = verificationResponse[0];

                const hashedOTP = verificationResponse[0].otp;

                if (expiresAt < Date.now()) {
                    await UserOTP.deleteMany({ userId });

                    throw new Error("Code has expired. Please request again.");
                } else {
                    const isOTPMatched = await bcrypt.compare(otp, hashedOTP);

                    if (!isOTPMatched) {
                        throw new Error("Invalid OTP. Please try again.");
                    } else {
                        await User.updateOne({ _id: userId }, { isVerified: true });

                        await UserOTP.deleteMany({ userId });

                        res.status(200).json({
                            message: "Account verified successfully. You can now login.",
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error in verifyOTP controller", error.message);
        res.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}

export const resendOTP = async (req, res) => {
    try {
        const { userId, email } = req.body;

        if (!userId || !email) {
            throw Error("Empty user details are not allowed");
        } else {
            await UserOTP.deleteMany({ userId });

            await sendEmail({ _id: userId, email }, res);
        }

    } catch (error) {
        console.log("Error in resendOTP controller", error.message);
        res.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}