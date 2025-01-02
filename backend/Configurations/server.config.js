import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
    mongoDBURI: process.env.MONGO_DB_URI,
    port: process.env.PORT,
    image_kit_url_endpoint: process.env.IK_URL_ENDPOINT,
    image_kit_public_key: process.env.IK_PUBLIC_KEY,
    image_kit_private_key: process.env.IK_PRIVATE_KEY,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
}

export default serverConfig;