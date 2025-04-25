import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  console.log("URL to delete:", url);
  
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Split URL by slash
    const urlParts = url.split('/');
    
    // Find the position of the 'upload' keyword in URL parts
    const uploadIndex = urlParts.findIndex((part: string) => part === 'upload');
    if (uploadIndex === -1) {
      return res.status(400).json({ error: "Invalid URL format - 'upload' not found" });
    }
    
    // Check for version part (starts with 'v')
    let startIndex = uploadIndex + 1;
    if (urlParts[startIndex] && urlParts[startIndex].startsWith('v')) {
      startIndex++; // Skip the version part
    }
    
    // Extract public_id including folder path and filename (excluding extension)
    const pathParts = urlParts.slice(startIndex);
    const publicId = pathParts.join('/').replace(/\.[^/.]+$/, "");
    
    console.log("Extracted public ID:", publicId);
    
    // Debug: Check if the path matches expected folder structure
    if (publicId.includes('Dev/Dev_Studio1') || publicId.includes('Dev/Dev_Portfolio')) {
      console.log("Public ID contains correct folder path");
    } else {
      console.log("Warning: Public ID might not have correct folder path");
    }
    
    // Delete the image using Cloudinary API
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Delete result:", result);
    
    if (result.result === "ok") {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete image", publicId, result });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
}
