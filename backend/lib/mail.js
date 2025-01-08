import nodemailer from "nodemailer"
import UserOTP from "../models/userOTP.model.js";
import serverConfig from "../Configurations/server.config.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "./generateOTP.js";


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: serverConfig.gmail_user_mail,
        pass: serverConfig.gmail_app_password
    }
})

const sendEmail = async ({ _id, email, username = "" }, res) => {
    try {
        const otp = `${generateOtp()}`;

        const emailTemplate = `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <h2>Account Verification</h2>
                <p>Hello ${username},</p>
                <p>Thank you for registering on our platform. To complete your registration, please verify your account using the OTP below:</p>
                <h3>${otp}</h3>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>Blogging Site Official</p>
            </div>
        `;

        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const newOTP = await UserOTP.create({
            userId: _id,
            otp: hashedOTP,
            expiresAt: new Date(Date.now() + 60 * 1000)
        })

        const response = await transporter.sendMail({
            from: serverConfig.gmail_user_mail,
            subject: "Account Verification OTP",
            to: email,
            html: emailTemplate
        })

        return res.status(200).json({
            status: "PENDING",
            message: "Verification email sent successfully. Please check your inbox.",
            data: {
                userId: _id,
                email: email,
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "FAILED",
            message: error.message,
        })
    }
}

export { sendEmail }