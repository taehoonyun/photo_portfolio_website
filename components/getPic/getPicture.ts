import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function fetchImagesFromFolder(folderPath: string,limit: number = 10) {
  try {
    const result = await cloudinary.v2.search
      .expression(`folder:${folderPath}`)
      .max_results(limit) // Set the limit here
      .execute();

    const urls = result.resources.map(
      (resource: { url: string }) => resource.url
    );

    return { home_profiles: urls };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { error: "Failed to fetch resources" };
  }
}
