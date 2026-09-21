import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const filePath = "C:/Users/dell/AppData/Local/Temp/opencode/tiny.png";
if (!fs.existsSync(filePath)) {
  const buf = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  );
  fs.writeFileSync(filePath, buf);
}

try {
  const res = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
  console.log("UPLOAD OK:", res.secure_url);
  fs.unlinkSync(filePath);
} catch (e) {
  console.log("UPLOAD FAILED:", e.message);
}