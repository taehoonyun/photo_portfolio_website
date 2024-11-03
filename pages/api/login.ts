import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
const SECRET_KEY = process.env.SECRET_KEY;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, anonymous } = req.body;
  
  
  // Owner credentials for login
  const owner = {
    id: 1,
    email: "test@example.com",
    password: "password", // Should be hashed in real-world scenarios
    tokenExpiration: "1w", // 1 week token expiration for owner
  };
  console.log(email === owner.email);

  if (!SECRET_KEY) {
    return res.status(500).json({ message: "Secret key is missing" });
  }
  // Anonymous login: If the user specifies 'anonymous' in the body
  if (anonymous) {
    // Generate a token for an anonymous user
    const anonymousToken = jwt.sign(
      { anonymous: true }, // Payload for anonymous user
      SECRET_KEY,
      { expiresIn: "5h" }, // Short expiration for anonymous session
    );

    // Set the token in a cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token_anony", anonymousToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 5, // 5 hours expiration for anonymous session
        sameSite: "strict",
        path: "/",
      }),
    );

    return res.status(200).json({ message: "Anonymous session started" });
  }

  // Check owner credentials for login
  if (email === owner.email && password === owner.password) {
    // Generate JWT token for the owner
    const token = jwt.sign({ id: owner.id, email: owner.email }, SECRET_KEY, {
      expiresIn: owner.tokenExpiration,
    });

    // Set the token in a cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1 week expiration for the owner
        sameSite: "strict",
        path: "/",
      }),
    );

    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
}
