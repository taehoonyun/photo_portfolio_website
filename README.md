# Photo Gallery Setup

This guide provides steps to configure and run the Photo Gallery application, including setting up Cloudinary for image management, configuring environment variables, and preparing JSON files to manage images.

## Prerequisites

- Node.js and npm installed
- Cloudinary account
- Gmail account for email configuration (or alternative email service)

---

## Step 1: Set up Cloudinary

Cloudinary will be used for storing and managing images for the gallery. Follow these steps to set up Cloudinary:

1. **Sign up for Cloudinary** (if you haven’t already) and create an account: [Cloudinary Signup](https://cloudinary.com/users/register_free).
2. **Get started with the Node.js setup** for Cloudinary by following this guide: [Node.js Quickstart](https://cloudinary.com/documentation/node_quickstart).

### Configure Cloudinary Upload Preset

1. Navigate to **Settings** > **Upload** in your Cloudinary dashboard.
2. Create an **upload preset** for configuring image upload options.
3. More information about presets can be found here: [Upload Presets Documentation](https://cloudinary.com/documentation/upload_presets).

### Example Structure of `photos.json`

Create a **JSON file** named `photos.json` in the `public` directory. This file will store the image URLs or paths used on the home and portfolio pages.

```json
{
  "logo": [
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1621234567/logo1.jpg",
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1621234567/logo2.jpg"
  ],
  "portfolio_main": "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1621234567/portfolio_main.jpg"
}
```

## Step 2: Create `.env`

In order to configure email settings, create a .env file in the root directory of your project. This file will store sensitive email configuration values that are required for sending emails.

```bash
# Email Configuration
EMAIL_USERNAME="sending_gmail@example.com"
EMAIL_PASSWORD="app_specific_password"
PERSONAL_EMAIL="receiving_email@example.com"

# Cloudinary Configuration
CLOUD_NAME="your_cloudinary_cloud_name"
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME="your_preset_name"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```
## Step 3: Create folders in Aset

Create Dev folder and create folders as below picture

![Alt text](https://res.cloudinary.com/dxk7brqop/image/upload/v1730693195/Screenshot_2024-11-03_at_10.56.27_PM_ieiwvm.png)

## Step 4: Run the Application

After setting up environment variables and configurations, follow these steps to start the application:

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

![Alt text](https://res.cloudinary.com/dxk7brqop/image/upload/v1726944926/Screenshot_2024-09-21_at_2.54.08_PM_b18vpi.png)

![Alt text](https://res.cloudinary.com/dxk7brqop/image/upload/v1726945176/Image_9-21-24_at_2.53_PM_vyci2u.jpg)

## Test Login Credentials

You can test the login functionality using these example credentials:

email: "test@example.com",
password: "password",
