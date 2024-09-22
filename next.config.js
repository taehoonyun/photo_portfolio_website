/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain for next/image
  },
}

module.exports = nextConfig
