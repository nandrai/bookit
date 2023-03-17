const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Uploader

const uploadToCloudinary = async (img) => {
  const res = await cloudinary.uploader.upload(`${img}`, {
    folder: "bookit",
    public_id: Date.now(),
  });
  return res;
};

module.exports = { cloudinary, uploadToCloudinary };
