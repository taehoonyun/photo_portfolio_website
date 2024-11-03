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
  try {
    // Search for resources specifically in the 'profile' folder
    const { folder, limit } = req.body;
    const resources1 = await cloudinary.search
      .expression(`format:jpg`) // Search within the 'profile' folder
      .sort_by("uploaded_at", "desc") // Sort by newest first
      .execute(); // Execute the search
      console.log(resources1);
    const resources = await cloudinary.search
      .expression(`folder:${folder}`) // Search within the 'profile' folder
      .max_results(limit)
      .sort_by("uploaded_at", "desc") // Sort by newest first
      .execute(); // Execute the search
      

    // Respond with the resources
    res.status(200).json({ images: resources.resources });
  } catch (error) {
    console.error("Error fetching Cloudinary assets:", error);
    // res.status(500).json({ error: "Error fetching images from Cloudinary" });
  }
}
