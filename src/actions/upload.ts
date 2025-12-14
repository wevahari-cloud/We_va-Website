"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getCloudinarySignature() {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = "western_valley"; // Optional: keep organized

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder,
            },
            process.env.CLOUDINARY_API_SECRET!
        );

        return {
            success: true,
            signature,
            timestamp,
            folder,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY
        };
    } catch (error) {
        console.error("Signature generation error:", error);
        return { success: false, error: "Failed to generate upload signature" };
    }
}
