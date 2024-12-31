import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import userRouter from "../routes/user.route.js";
import postRouter from "../routes/post.route.js";
import authRouter from "../routes/auth.route.js";
import commentRouter from "../routes/comment.route.js";
import webHookRouter from "../routes/webhook.route.js";
import connectDB from "../lib/connectDB.js";
import serverConfig from "../Configurations/server.config.js";

const app = express();
dotenv.config();
const port = serverConfig.port || 3000;

app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.AllowedOrigin1, process.env.AllowedOrigin2];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET, POST, PUT, DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/users",userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {

    res.status(error.status || 500);

    res.json({
        message: error.message || "Something went wrong",
        status: error.status,
        stack: error.stack
    });
})

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port:", port);
})