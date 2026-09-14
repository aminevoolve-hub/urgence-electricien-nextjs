"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ExternalLink, Loader2, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";

type AdminPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  source: "code" | "dashboard";
  hidden?: boolean;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/blog", { cache: "no-store" });
    const data = await res.json();
    setPosts(data.posts);
    setConfigured(data.configured);
    setLoading(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  function notify(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 5000);
  }

  async function remove(post: AdminPost) {
    const verb = post.source === "code" && !post.hidden ? "Retirer du site" : "Supprimer définitivement";
    if (!confirm(`${verb} « ${post.title} » ?`)) return;
    setBusy(post.slug);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: post.slug }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Échec");
      await load();
      notify("ok", `« ${post.title} » retiré du site.`);
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Échec");
    } finally {
      setBusy(null);
    }
  }

  async function restore(post: AdminPost) {
    setBusy(post.slug);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: post.slug, restore: true }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Échec");
      await load();
      notify("ok", `« ${post.title} » republié.`);
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Échec");
    } finally {
      setBusy(null);
    }
  }

  const q = filter.trim().toLowerCase();
  const visible = q
    ? posts.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.slug.includes(q))
    : posts;
  const published = posts.filter((p) => !p.hidden).length;

  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-navy-900">Articles de blogue</h1>
            <p className="mt-2 text-navy-600">
              {published} article{published > 1 ? "s" : ""} en ligne. Les changements sont publiés immédiatement.
            </p>
          </div>
          <Link
            href="/admin/blog/nouveau"
            className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-amber-400"
          >
            <Plus className="h-4 w-4" /> Nouvel article
          </Link>
        </div>

        {!configured && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            Le stockage n&apos;est pas configuré (variable BLOB_READ_WRITE_TOKEN manquante). Impossible d&apos;enregistrer des
            articles tant qu&apos;elle n&apos;est pas ajoutée dans Vercel.
          </div>
        )}

        {toast && (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm ${
              toast.kind === "ok" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {toast.text}
          </div>
        )}

        {loading ? (
          <div className="mt-12 flex items-center gap-3 text-navy-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement des articles…
          </div>
        ) : (
          <>
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrer par titre, catégorie ou slug…"
              className="mt-8 w-full max-w-md rounded-xl border border-navy-200 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-900 focus:ring-2 focus:ring-amber-400/50"
            />

            <div className="mt-6 overflow-x-auto rounded-3xl border border-navy-100 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-navy-50 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
                  <tr>
                    <th className="px-5 py-3">Article</th>
                    <th className="px-5 py-3">Catégorie</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Statut</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {visible.map((post) => (
                    <tr key={post.slug} className={post.hidden ? "opacity-60" : ""}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy-900">{post.title}</p>
                        <p className="mt-0.5 text-xs text-navy-400">/blog/{post.slug}</p>
                      </td>
                      <td className="px-5 py-4 text-navy-700">{post.category}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-navy-700">
                        {new Date(`${post.date}T12:00:00`).toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                            post.hidden
                              ? "bg-navy-100 text-navy-500"
                              : post.source === "dashboard"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {post.hidden ? "Retiré" : post.source === "dashboard" ? "Modifié ici" : "En ligne"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {busy === post.slug ? (
                            <Loader2 className="h-4 w-4 animate-spin text-navy-400" />
                          ) : post.hidden ? (
                            <button
                              onClick={() => restore(post)}
                              title="Republier"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 hover:bg-navy-50"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                          ) : (
                            <>
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Voir sur le site"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 hover:bg-navy-50"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                              <Link
                                href={`/admin/blog/${post.slug}`}
                                title="Modifier"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 hover:bg-navy-50"
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => remove(post)}
                                title="Retirer du site"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-navy-500">
                        Aucun article ne correspond.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
