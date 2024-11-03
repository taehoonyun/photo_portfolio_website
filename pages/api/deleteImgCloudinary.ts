import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  
  const publicId = url
    .split("/")
    .slice(7)
    .join("/") // Remove the first 7 segments (up to `upload/`)
    .replace(/\.[^/.]+$/, ""); // Remove the file extension

  if (!publicId) {
    return res.status(400).json({ error: "Public ID is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete image" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
}
