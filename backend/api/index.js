import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import path from "path";

// Routes
import userRouter from "../routes/user.route.js";
import postRouter from "../routes/post.route.js";
import commentRouter from "../routes/comment.route.js";
import webHookRouter from "../routes/webhook.route.js";
import connectDB from "../lib/connectDB.js";
import serverConfig from "../Configurations/server.config.js";

const app = express();
const port = serverConfig.clientUrl || 3000;
const __dirname = path.resolve();

app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);

app.use(express.json());

const allowedOrigins = serverConfig.allowedOrigins;

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// // for testing purposes
// app.get("/auth-state", (req, res) => {
//     const authState = req.auth;
//     res.json(authState);
// })

// first approach
// app.get("/protect", (req, res) => {
//     const {userId} = req.auth;
//     if(!userId) return res.status(401).json({message: "not authenticated"});

//     res.status(200).json({message: "authentication successful"});
// })

// second approach
// app.get("/protect2", requireAuth(), (req, res) => {
//     res.status(200).json({ message: "authentication successful" });
// })

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.use((error, req, res, next) => {

    res.status(error.status || 500);

    res.json({
        message: error.message || "Something went wrong",
        status: error.status,
        stack: error.stack
    });
})

app.listen(serverConfig.clientUrl, () => {
    connectDB();
    console.log("Server is running on port:", serverConfig.clientUrl);
})