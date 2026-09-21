import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || "";
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext.toLowerCase()}`)
    }
})

const upload = multer({ storage })

export default upload