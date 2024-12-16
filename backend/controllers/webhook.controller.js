import { Webhook } from "svix";
import serverConfig from "../Configurations/server.config.js"
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
    const WEBHOOK_SECRET = serverConfig.clerkWebHookSecret;

    if (!WEBHOOK_SECRET) {
        throw new Error("WebHook Secret is required");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (error) {
        res.status(400).json({
            message: "Invalid Webhook signature",
        });
    }

    if (evt.type === "user.created") {
        const newUser = new User({
            
        })        
    }
}