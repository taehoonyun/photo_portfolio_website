// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handles POST requests to /api
export default async function POST(
  request: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve environment variables

    const {
      EMAIL_USERNAME: username,
      EMAIL_PASSWORD: password,
      PERSONAL_EMAIL: myEmail,
    } = process.env;
    if (!username || !password || !myEmail) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    // // Parse form data from the request
    if (request.body) {
      const { name, email, message } = request.body;
      // // Validate that environment variables are set
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required form data" });
      }
      // Create transporter using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: username,
          pass: password,
        },
      });

      // Sending email
      await transporter.sendMail({
        from: username,
        to: myEmail,
        replyTo: email,
        subject: `Yun Message from ${email}`,
        html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
      });

      return res.status(200).json({ message: "Success: email was sent" });
    } else {
      // return NextResponse.json({ message: "Missing required form data" }, { status: 400 });
    }
  } catch (error) {
    return res.status(500).json({ message: "COULD NOT SEND MESSAGE" });
  }
}
