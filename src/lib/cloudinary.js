import cloudinary from "cloudinary";

// Configure using environment variables. Do NOT commit secrets to source control.
const { CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (CLOUDINARY_URL) {
  cloudinary.config({ secure: true, url: CLOUDINARY_URL });
} else if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  // No credentials available in environment; uploads will fail at runtime with a clear error.
  console.warn("Cloudinary not configured: set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET");
}

export default cloudinary.v2 || cloudinary;
