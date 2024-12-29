import { v2 as cloudinary } from 'cloudinary';
import serverConfig from '../Configurations/server.config.js';

cloudinary.config({
    cloud_name: serverConfig.cloudinary_cloud_name,
    api_key: serverConfig.cloudinary_api_key,
    api_secret: serverConfig.cloudinary_api_secret,
});

export default cloudinary;