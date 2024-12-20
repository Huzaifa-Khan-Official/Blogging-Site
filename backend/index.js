import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

// Routes
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webHookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";
import serverConfig from "./Configurations/server.config.js";

const app = express();

app.use(cors(serverConfig.clientUrl));
app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);

app.use(express.json());

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

app.use((error, req, res, next) => {

    res.status(error.status || 500);

    res.json({
        message: error.message || "Something went wrong",
        status: error.status,
        stack: error.stack
    });
})

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
})