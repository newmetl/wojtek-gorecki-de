import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "blog");

export function uploadBlogImage(
  imageData: string,
  imageMimeType: string,
  existingImageUrl?: string | null
): string {
  // Remove old image if exists
  if (existingImageUrl) {
    deleteBlogImage(existingImageUrl);
  }

  const ext = imageMimeType.split("/")[1] || "png";
  const filename = `${uuidv4()}.${ext}`;

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const buffer = Buffer.from(imageData, "base64");
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return `/api/uploads/blog/${filename}`;
}

export function deleteBlogImage(imageUrl: string): void {
  // Extract filename from either old format (/uploads/blog/x.jpg) or new (/api/uploads/blog/x.jpg)
  const filename = path.basename(imageUrl);
  const filePath = path.join(UPLOAD_DIR, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Also check old public path for backwards compatibility
  const oldPath = path.join(process.cwd(), "public", "uploads", "blog", filename);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }
}
