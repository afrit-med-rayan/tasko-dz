/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow images from Cloudflare R2 and other external sources in production
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "**.r2.dev" },
            { protocol: "https", hostname: "**.cloudflare.com" },
        ],
    },
    // Expose the API URL to the browser
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
    },
};

export default nextConfig;
