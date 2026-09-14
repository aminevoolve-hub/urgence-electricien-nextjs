"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { ArrowLeft, ImageIcon, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";

type Faq = { question: string; answer: string };

type Form = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  keywords: string;
  relatedServiceSlug: string;
  content: string;
  faq: Faq[];
};

type ServiceOption = { slug: string; name: string };

const ACCEPT = ".jpg,.jpeg,.png,.webp,.avif";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

const today = () => new Date().toISOString().slice(0, 10);

const empty = (): Form => ({
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  date: today(),
  keywords: "",
  relatedServiceSlug: "depannage-urgence",
  content: "",
  faq: [{ question: "", answer: "" }],
});

const input =
  "mt-2 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-900 focus:ring-2 focus:ring-amber-400/50";

export default function AdminBlogEditor() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const isNew = params.slug === "nouveau";

  const [form, setForm] = useState<Form>(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageBusy, setImageBusy] = useState<number | "publish" | null>(null);

  const loadImage = useCallback(async (slug: string) => {
    const res = await fetch("/api/admin/images", { cache: "no-store" });
    const data = await res.json();
    const blog = (data.groups as { id: string; slots: { name: string; current: string | null }[] }[]).find(
      (g) => g.id === "blog"
    );
    setImage(blog?.slots.find((s) => s.name === slug)?.current ?? null);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/blog", { cache: "no-store" });
      const data = await res.json();
      setCategories(data.categories);
      setServices(data.services);
      if (!isNew) {
        const post = (data.posts as Array<Record<string, unknown>>).find((p) => p.slug === params.slug);
        if (!post) {
          setError("Article introuvable");
        } else {
          const faq = (post.faq as Faq[] | undefined) ?? [];
          setForm({
            slug: String(post.slug),
            title: String(post.title),
            category: String(post.category),
            excerpt: String(post.excerpt),
            date: String(post.date),
            keywords: (post.keywords as string[]).join(", "),
            relatedServiceSlug: String(post.relatedServiceSlug),
            content: (post.content as string[]).join("\n\n"),
            faq: faq.length ? faq : [{ question: "", answer: "" }],
          });
          setSlugTouched(true);
          await loadImage(String(post.slug));
        }
      } else {
        setForm((f) => ({ ...f, category: data.categories[0] ?? "" }));
      }
      setLoading(false);
    })();
  }, [isNew, params.slug, loadImage]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setTitle(value: string) {
    setForm((f) => ({ ...f, title: value, slug: isNew && !slugTouched ? slugify(value) : f.slug }));
  }

  const wordCount = useMemo(() => form.content.split(/\s+/).filter(Boolean).length, [form.content]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(null);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          mode: isNew ? "create" : "update",
          ...(isNew ? {} : { updated: today() }),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'enregistrement");
      setSaved(`Article publié : /blog/${data.post.slug}`);
      if (isNew) router.replace(`/admin/blog/${data.post.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    setImageBusy(0);
    setError(null);
    try {
      const blob = await upload(`images/blog/${form.slug}/${Date.now()}.${ext}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/images/upload",
        onUploadProgress: ({ percentage }) => setImageBusy(percentage),
      });
      setImageBusy("publish");
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "blog", name: form.slug, url: blob.url }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Échec de la publication de l'image");
      await loadImage(form.slug);
      setSaved("Image de l'article mise à jour.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'upload");
    } finally {
      setImageBusy(null);
    }
  }

  function updateFaq(i: number, key: keyof Faq, value: string) {
    setForm((f) => ({ ...f, faq: f.faq.map((q, j) => (j === i ? { ...q, [key]: value } : q)) }));
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-10 text-navy-500">
        <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-full p-6 lg:p-10">
      <form onSubmit={submit} className="mx-auto max-w-4xl">
        <Link href="/admin/blog" className="flex w-fit items-center gap-2 text-sm font-semibold text-navy-600 hover:text-navy-900">
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-heading text-3xl text-navy-900">{isNew ? "Nouvel article" : "Modifier l'article"}</h1>
          <div className="flex items-center gap-3">
            {!isNew && (
              <a
                href={`/blog/${form.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-navy-600 hover:text-navy-900"
              >
                Voir sur le site ↗
              </a>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isNew ? "Publier" : "Enregistrer"}
            </button>
          </div>
        </div>

        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
        {saved && <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">✓ {saved}</div>}

        <section className="mt-8 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg text-navy-900">Informations</h2>
          <label className="mt-5 block text-sm font-medium text-navy-800">
            Titre (H1)
            <input
              value={form.title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={input}
              placeholder="Ex. : Électricien d'urgence à Laval : intervention en moins d'une heure"
            />
            <span className="mt-1 block text-xs text-navy-400">
              {form.title.length} caractères — visez 55 à 70 avec le mot-clé principal.
            </span>
          </label>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-navy-800">
              Adresse (slug)
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                required
                disabled={!isNew}
                className={`${input} disabled:bg-navy-50 disabled:text-navy-500`}
              />
              <span className="mt-1 block text-xs text-navy-400">/blog/{form.slug || "…"}</span>
            </label>
            <label className="block text-sm font-medium text-navy-800">
              Date de publication
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required className={input} />
            </label>
            <label className="block text-sm font-medium text-navy-800">
              Catégorie
              <select value={form.category} onChange={(e) => set("category", e.target.value)} required className={input}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-navy-800">
              Service lié (encadré en bas de l&apos;article)
              <select
                value={form.relatedServiceSlug}
                onChange={(e) => set("relatedServiceSlug", e.target.value)}
                required
                className={input}
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-navy-800">
            Extrait / meta description
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required rows={2} className={input} />
            <span className={`mt-1 block text-xs ${form.excerpt.length > 160 ? "text-red-600" : "text-navy-400"}`}>
              {form.excerpt.length} / 160 caractères — affiché dans Google et sur les cartes d&apos;articles.
            </span>
          </label>
          <label className="mt-5 block text-sm font-medium text-navy-800">
            Mots-clés (séparés par des virgules)
            <input
              value={form.keywords}
              onChange={(e) => set("keywords", e.target.value)}
              required
              className={input}
              placeholder="électricien d'urgence Laval, panne électrique Laval, électricien 24h Laval"
            />
          </label>
        </section>

        <section className="mt-6 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-lg text-navy-900">Contenu</h2>
            <span className={`text-xs ${wordCount < 800 ? "text-amber-700" : "text-navy-400"}`}>
              {wordCount} mots — visez 1 000 à 1 600 pour le référencement.
            </span>
          </div>
          <p className="mt-2 text-xs text-navy-500">
            Un paragraphe par ligne. Commencez une ligne par <code className="rounded bg-navy-50 px-1">## </code> pour un titre,{" "}
            <code className="rounded bg-navy-50 px-1">### </code> pour un sous-titre, <code className="rounded bg-navy-50 px-1">- </code>{" "}
            pour une puce. Dans le texte : <code className="rounded bg-navy-50 px-1">**gras**</code> et{" "}
            <code className="rounded bg-navy-50 px-1">[texte](/services/depannage-urgence)</code> pour un lien.
          </p>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            required
            rows={24}
            className={`${input} font-mono text-[13px] leading-relaxed`}
            placeholder={"Il est 23 h et le panneau grésille…\n\n## Quand appeler un électricien d'urgence\n\nParagraphe…\n\n- Point 1\n- Point 2"}
          />
        </section>

        <section className="mt-6 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg text-navy-900">Questions fréquentes (FAQ)</h2>
          <p className="mt-1 text-xs text-navy-500">
            Affichées en accordéon sous l&apos;article et balisées pour Google. Laissez vide pour ne pas en afficher.
          </p>
          <div className="mt-4 space-y-4">
            {form.faq.map((q, i) => (
              <div key={i} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <input
                      value={q.question}
                      onChange={(e) => updateFaq(i, "question", e.target.value)}
                      placeholder="Question"
                      className={`${input} mt-0 bg-white`}
                    />
                    <textarea
                      value={q.answer}
                      onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      placeholder="Réponse (50 à 90 mots)"
                      rows={3}
                      className={`${input} mt-0 bg-white`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, faq: f.faq.filter((_, j) => j !== i) }))}
                    title="Retirer"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, faq: [...f.faq, { question: "", answer: "" }] }))}
            className="mt-4 flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:border-navy-400"
          >
            <Plus className="h-4 w-4" /> Ajouter une question
          </button>
        </section>

        <section className="mt-6 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg text-navy-900">Image de l&apos;article</h2>
          {isNew ? (
            <p className="mt-2 text-sm text-navy-500">
              Publiez d&apos;abord l&apos;article, puis ajoutez son image ici (sinon l&apos;image par défaut du blogue est utilisée).
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-navy-100 sm:w-72">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-navy-400">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs">Image par défaut du blogue</span>
                  </div>
                )}
                {imageBusy !== null && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-950/70 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm">{imageBusy === "publish" ? "Publication…" : `Envoi ${Math.round(imageBusy)} %`}</span>
                  </div>
                )}
              </div>
              <label className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:border-navy-400">
                <Upload className="h-4 w-4" /> {image ? "Remplacer l'image" : "Ajouter une image"}
                <input
                  type="file"
                  accept={ACCEPT}
                  className="hidden"
                  disabled={imageBusy !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? "Publier l'article" : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
