// pages/api/sign-cloudinary-params.ts
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const SECRET_KEY = process.env.CLOUDINARY_API_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract paramsToSign from the request body
    const { paramsToSign } = req.body as { paramsToSign: Record<string, string> };

    if (!SECRET_KEY) {
      return res.status(500).json({ error: "Missing Cloudinary API secret" });
    }

    // Generate the signature
    const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, SECRET_KEY);

    res.status(200).json({ signature });
  } catch (error) {
    res.status(500).json({ error: "Cloudinary signature generation failed" });
  }
}
