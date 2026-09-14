import { NextRequest, NextResponse } from "next/server";
import type { BlogPost, BlogFaq } from "@/lib/blog-types";
import { blogCategories } from "@/lib/blog";
import { services } from "@/lib/services";
import { deletePost, getAllPostsForAdmin, isBlobConfigured, restorePost, savePost } from "@/lib/blog-store";

export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET() {
  const posts = await getAllPostsForAdmin();
  return NextResponse.json({
    configured: isBlobConfigured(),
    categories: blogCategories,
    services: services.map((s) => ({ slug: s.slug, name: s.name })),
    posts: posts.map((p) => ({ ...p })),
  });
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>): { post?: BlogPost; error?: string } {
  const slug = clean(body.slug).toLowerCase();
  const title = clean(body.title);
  const category = clean(body.category);
  const excerpt = clean(body.excerpt);
  const date = clean(body.date);
  const relatedServiceSlug = clean(body.relatedServiceSlug);

  if (!SLUG_RE.test(slug)) return { error: "Slug invalide (lettres minuscules, chiffres et tirets seulement)" };
  if (title.length < 10) return { error: "Le titre doit faire au moins 10 caractères" };
  if (!category) return { error: "Choisissez une catégorie" };
  if (excerpt.length < 40) return { error: "L'extrait (meta description) doit faire au moins 40 caractères" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Date invalide (AAAA-MM-JJ)" };
  if (!services.some((s) => s.slug === relatedServiceSlug)) return { error: "Service lié invalide" };

  const content = Array.isArray(body.content)
    ? body.content.map(clean).filter(Boolean)
    : clean(body.content)
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
  if (content.length < 3) return { error: "Le contenu doit contenir au moins 3 blocs (paragraphes ou titres)" };

  const keywords = (Array.isArray(body.keywords) ? body.keywords.map(clean) : clean(body.keywords).split(","))
    .map((k) => k.trim())
    .filter(Boolean);
  if (!keywords.length) return { error: "Ajoutez au moins un mot-clé" };

  const faq: BlogFaq[] = Array.isArray(body.faq)
    ? (body.faq as Array<Record<string, unknown>>)
        .map((f) => ({ question: clean(f?.question), answer: clean(f?.answer) }))
        .filter((f) => f.question && f.answer)
    : [];

  const updated = clean(body.updated);
  const post: BlogPost = {
    slug,
    title,
    category,
    excerpt,
    date,
    ...(updated && /^\d{4}-\d{2}-\d{2}$/.test(updated) ? { updated } : {}),
    keywords,
    relatedServiceSlug,
    content,
    ...(faq.length ? { faq } : {}),
  };
  return { post };
}

export async function POST(request: NextRequest) {
  if (!isBlobConfigured()) {
    return NextResponse.json({ error: "Stockage non configuré (BLOB_READ_WRITE_TOKEN)" }, { status: 500 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  const { post, error } = validate(body);
  if (!post) return NextResponse.json({ error }, { status: 400 });

  const existing = (await getAllPostsForAdmin()).find((p) => p.slug === post.slug);
  if (existing && body.mode === "create") {
    return NextResponse.json({ error: "Un article avec ce slug existe déjà" }, { status: 409 });
  }

  await savePost(post);
  return NextResponse.json({ success: true, post });
}

export async function DELETE(request: NextRequest) {
  const { slug, restore } = (await request.json()) as { slug?: string; restore?: boolean };
  if (!slug || !SLUG_RE.test(slug)) return NextResponse.json({ error: "Slug invalide" }, { status: 400 });
  if (restore) await restorePost(slug);
  else await deletePost(slug);
  return NextResponse.json({ success: true });
}
