const serverConfig = {
    mongoDBURI: process.env.MONGO_DB_URI,
    clerkWebHookSecret: process.env.CLERK_WEBHOOK_SECRET,
}

export default serverConfig;