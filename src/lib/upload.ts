import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const BLOG_UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "blog");
const LOCATION_UPLOAD_DIR = path.join(process.cwd(), "data", "uploads", "locations");

function writeImage(
  dir: string,
  imageData: string,
  imageMimeType: string
): string {
  const ext = imageMimeType.split("/")[1] || "png";
  const filename = `${uuidv4()}.${ext}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buffer = Buffer.from(imageData, "base64");
  fs.writeFileSync(path.join(dir, filename), buffer);

  return filename;
}

export function uploadBlogImage(
  imageData: string,
  imageMimeType: string,
  existingImageUrl?: string | null
): string {
  if (existingImageUrl) {
    deleteBlogImage(existingImageUrl);
  }
  const filename = writeImage(BLOG_UPLOAD_DIR, imageData, imageMimeType);
  return `/api/uploads/blog/${filename}`;
}

export function deleteBlogImage(imageUrl: string): void {
  const filename = path.basename(imageUrl);
  const filePath = path.join(BLOG_UPLOAD_DIR, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const oldPath = path.join(process.cwd(), "public", "uploads", "blog", filename);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }
}

export function uploadLocationImage(
  imageData: string,
  imageMimeType: string,
  existingImageUrl?: string | null
): string {
  if (existingImageUrl) {
    deleteLocationImage(existingImageUrl);
  }
  const filename = writeImage(LOCATION_UPLOAD_DIR, imageData, imageMimeType);
  return `/api/uploads/locations/${filename}`;
}

export function deleteLocationImage(imageUrl: string): void {
  const filename = path.basename(imageUrl);
  const filePath = path.join(LOCATION_UPLOAD_DIR, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
