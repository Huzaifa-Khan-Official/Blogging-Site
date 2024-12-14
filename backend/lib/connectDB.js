import mongoose from "mongoose"
import serverConfig from "../Configurations/server.config.js"

const connectDB = async () => {
    try {
        await mongoose.connect(serverConfig.mongoDBURI);
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

export default connectDB;