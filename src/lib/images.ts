import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function findImageFile(section: string, name: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", section);
  if (!fs.existsSync(dir)) return null;

  const base = name.replace(/\.[^/.]+$/, "");
  const files = fs.readdirSync(dir);

  for (const ext of IMAGE_EXTENSIONS) {
    if (files.includes(`${base}${ext}`)) {
      return `/images/${section}/${base}${ext}`;
    }
  }
  return null;
}

/**
 * Resolves an image by exact base name inside public/images/{section}, or null when no
 * real file has been uploaded yet. Callers render an authored illustration/icon instead of
 * a stock-photo placeholder so the site never shows an unrelated stock photo as if it were
 * real project or company photography.
 */
export function getImage(section: string, name: string): string | null {
  return findImageFile(section, name);
}

export function listImages(section: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map((f) => `/images/${section}/${f}`);
}

export type VideoSources = { webm: string | null; mp4: string | null };

/**
 * Resolves webm and mp4 variants by exact base name inside public/videos, or null when no
 * real file has been uploaded yet. Callers should prefer the smaller webm with an mp4 fallback.
 */
export function getVideo(name: string): VideoSources {
  const dir = path.join(process.cwd(), "public", "videos");
  const base = name.replace(/\.[^/.]+$/, "");
  if (!fs.existsSync(dir)) return { webm: null, mp4: null };

  const files = fs.readdirSync(dir);
  return {
    webm: files.includes(`${base}.webm`) ? `/videos/${base}.webm` : null,
    mp4: files.includes(`${base}.mp4`) ? `/videos/${base}.mp4` : null,
  };
}
