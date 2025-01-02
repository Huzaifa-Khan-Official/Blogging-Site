import jwt from "jsonwebtoken"
import serverConfig from "../Configurations/server.config.js";


export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, serverConfig.jwt_secret_key, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });

    return token;
}