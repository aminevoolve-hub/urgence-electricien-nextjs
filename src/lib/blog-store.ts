import { del, list, put } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import type { BlogPost } from "./blog-types";
import { blogPosts as bundledPosts } from "./blog";

export const BLOG_BLOB_PREFIX = "blog/";

type StoredPost = BlogPost & { deleted?: boolean };

export type PostSource = "code" | "dashboard";
export type PostWithSource = BlogPost & { source: PostSource; hidden?: boolean };

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function blobPath(slug: string) {
  return `${BLOG_BLOB_PREFIX}${slug}.json`;
}

// One JSON blob per slug. A blob with the same slug as a bundled post overrides it;
// `{ deleted: true }` hides a bundled post without touching the code.
async function loadStoredPosts(): Promise<Record<string, StoredPost>> {
  if (!isBlobConfigured()) return {};
  const stored: Record<string, StoredPost> = {};
  try {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: BLOG_BLOB_PREFIX, cursor, limit: 1000 });
      await Promise.all(
        page.blobs.map(async (blob) => {
          if (!blob.pathname.endsWith(".json")) return;
          const res = await fetch(`${blob.url}?v=${new Date(blob.uploadedAt).getTime()}`, {
            cache: "no-store",
          });
          if (!res.ok) return;
          const data = (await res.json()) as StoredPost;
          if (data && typeof data.slug === "string") stored[data.slug] = data;
        })
      );
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch (error) {
    console.error("Blog blob list failed, using bundled posts only:", error);
  }
  return stored;
}

async function mergePosts(): Promise<PostWithSource[]> {
  const stored = await loadStoredPosts();
  const merged: PostWithSource[] = [];
  const seen = new Set<string>();

  for (const post of bundledPosts) {
    seen.add(post.slug);
    const override = stored[post.slug];
    if (override?.deleted) {
      merged.push({ ...post, source: "code", hidden: true });
    } else if (override) {
      const { deleted: _deleted, ...rest } = override;
      void _deleted;
      merged.push({ ...rest, source: "dashboard" });
    } else {
      merged.push({ ...post, source: "code" });
    }
  }
  for (const post of Object.values(stored)) {
    if (seen.has(post.slug) || post.deleted) continue;
    const { deleted: _deleted, ...rest } = post;
    void _deleted;
    merged.push({ ...rest, source: "dashboard" });
  }

  return merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

const getMergedPosts = unstable_cache(mergePosts, ["blog-posts"], { tags: ["blog"] });

/** Every post the admin can see, including hidden bundled ones. */
export async function getAllPostsForAdmin(): Promise<PostWithSource[]> {
  return mergePosts();
}

/** Published posts, newest first. */
export async function getPosts(): Promise<BlogPost[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => !p.hidden).map(({ source: _s, hidden: _h, ...post }) => {
    void _s;
    void _h;
    return post;
  });
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function savePost(post: BlogPost) {
  await put(blobPath(post.slug), JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  revalidateBlog(post.slug);
}

export async function deletePost(slug: string) {
  const bundled = bundledPosts.some((p) => p.slug === slug);
  if (bundled) {
    await put(blobPath(slug), JSON.stringify({ slug, deleted: true }), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    const { blobs } = await list({ prefix: blobPath(slug), limit: 10 });
    const urls = blobs.filter((b) => b.pathname === blobPath(slug)).map((b) => b.url);
    if (urls.length) await del(urls);
  }
  revalidateBlog(slug);
}

/** Bring a hidden bundled post back by removing its tombstone. */
export async function restorePost(slug: string) {
  const { blobs } = await list({ prefix: blobPath(slug), limit: 10 });
  const urls = blobs.filter((b) => b.pathname === blobPath(slug)).map((b) => b.url);
  if (urls.length) await del(urls);
  revalidateBlog(slug);
}

export function revalidateBlog(slug?: string) {
  revalidateTag("blog", { expire: 0 });
  revalidateTag("images", { expire: 0 });
  revalidatePath("/", "layout");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}
