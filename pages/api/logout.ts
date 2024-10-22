import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Clear the token cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1, // Expire the cookie immediately
        sameSite: "strict",
        path: "/",
      }),
    );

    return res.status(200).json({ message: "Logged out successfully" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
