import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
    const WEBHOOK_SECRET = "whsec_YtTndu5/3iIY4mBZhGFi//7e3uSu+WP0";

    if (!WEBHOOK_SECRET) {
        return res.status(500).json({ message: "Webhook secret is required" });
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
        evt = wh.verify(payload, headers); // Verify webhook signature
    } catch (error) {
        console.error("Webhook verification failed:", error.message);
        return res.status(400).json({ message: "Invalid Webhook signature" });
    }

    try {
        if (evt.type === "user.created") {
            const newUser = new User({
                clerkUserId: evt.data.id,
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.profile_img_url,
            });

            await newUser.save();
        } else if (evt.type === "user.deleted") {
            await User.deleteOne({ clerkUserId: evt.data.id });
        }

        return res.status(200).json({ message: "Webhook processed successfully" });
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        return res.status(500).json({ message: "Error processing webhook", error: error.message });
    }
};