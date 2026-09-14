import { del, list } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export const BLOB_PREFIX = "images/";

export type ImageOverrides = Record<string, string>;

export function slotKey(section: string, name: string) {
  return `${section}/${name}`;
}

export function slotPrefix(section: string, name: string) {
  return `${BLOB_PREFIX}${section}/${name}/`;
}

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Blobs live at images/{section}/{name}/{timestamp}.{ext}; the newest one per slot wins.
export async function loadImageOverrides(): Promise<ImageOverrides> {
  if (!isBlobConfigured()) return {};

  const overrides: ImageOverrides = {};
  const newest: Record<string, number> = {};

  try {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: BLOB_PREFIX, cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const [, section, name] = blob.pathname.split("/");
        if (!section || !name) continue;
        const key = slotKey(section, name);
        const uploadedAt = new Date(blob.uploadedAt).getTime();
        if (!(key in newest) || uploadedAt > newest[key]) {
          newest[key] = uploadedAt;
          overrides[key] = blob.url;
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch (error) {
    console.error("Blob list failed, falling back to bundled images:", error);
  }

  return overrides;
}

export const getImageOverrides = unstable_cache(loadImageOverrides, ["image-overrides"], {
  tags: ["images"],
});

export async function deleteSlotBlobs(section: string, name: string, keepUrl?: string) {
  const { blobs } = await list({ prefix: slotPrefix(section, name), limit: 1000 });
  const urls = blobs.map((b) => b.url).filter((url) => url !== keepUrl);
  if (urls.length) await del(urls);
}

export function revalidateImages() {
  revalidateTag("images", { expire: 0 });
  revalidatePath("/", "layout");
}
