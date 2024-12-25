const configuration = {
    imageKitUrlEndPoint: import.meta.env.VITE_IK_URL_ENDPOINT,
    imageKitPublicKey: import.meta.env.VITE_IK_PUBLIC_KEY,
    clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    apiUrl: import.meta.env.VITE_NODE_ENV == "production" ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_LOCAL_API_URL,
};

export default configuration;