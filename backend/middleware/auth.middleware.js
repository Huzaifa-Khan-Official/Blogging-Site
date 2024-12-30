import serverConfig from "../Configurations/server.config.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        console.log("request ==>", req.cookies);
        
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "Not authorized - No token provided"
            })
        }

        const decoded = jwt.verify(token, serverConfig.jwt_secret_key);

        if (!decoded) {
            return res.status(401).json({
                message: "Not authorized - Invalid token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}