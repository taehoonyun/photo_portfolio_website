# Photo Gallery Setup

## Step 1: Create `photos.json` in the `public` Directory

To manage the images displayed on the home page and portfolio page, create a **JSON file** named `photos.json` inside the `public` directory of your project. This JSON file will store the paths to your image resources.

### Example Structure of `photos.json`

```json
{
  "home_profiles": [
    // Add paths or URLs for the home profile images here
  ],
  "portfolio_pictures": [
    // Add paths or URLs for the portfolio images here
  ],
  "portfolio_main": "" // Add the path or URL for the main portfolio image here
}
```

## Step 2: Create `.env`

In order to configure email settings, create a .env file in the root directory of your project. This file will store sensitive email configuration values that are required for sending emails.

```bash
EMAIL_USERNAME = "sending gmail"
EMAIL_PASSWORD = "gmail account app key"
PERSONAL_EMAIL = "receiving email"
```

![Alt text](https://res.cloudinary.com/dxk7brqop/image/upload/v1726944926/Screenshot_2024-09-21_at_2.54.08_PM_b18vpi.png)

![Alt text](https://res.cloudinary.com/dxk7brqop/image/upload/v1726945176/Image_9-21-24_at_2.53_PM_vyci2u.jpg)


## Set up Cloudinary

get start: https://cloudinary.com/documentation/node_quickstart

preset: https://cloudinary.com/documentation/upload_presets
