// lib/fetchImages.ts
import axios from "axios";

export async function fetchImagesFromFolder(folderPath: string, limit: number = 10) {
  try {
    // Call the server-side API route
    const response = await axios.post("/api/getCloudinary", {
      folder: folderPath,
      limit,
    });
    // Extract image URLs from the response
    return { pictures: response.data.images };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { error: "Failed to fetch resources" };
  }
}
