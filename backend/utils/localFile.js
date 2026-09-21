import fs from "fs";
import path from "path";

const uploadsDir = () => path.join(process.cwd(), "public", "uploads");

export const makeUploadDir = () => {
  const dir = uploadsDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

export const deleteLocalFile = (url) => {
  if (!url || !url.startsWith("/uploads/")) return;
  const filePath = path.join(uploadsDir(), path.basename(url));
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.log("deleteLocalFile error:", error);
  }
};