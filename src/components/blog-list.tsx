"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Reveal from "./reveal";

type PostWithImage = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string | null;
};

export default function BlogList({
  posts,
  categories,
}: {
  posts: PostWithImage[];
  categories: readonly string[];
}) {
  const [categorie, setCategorie] = useState<string | null>(null);
  const filtered = categorie ? posts.filter((p) => p.category === categorie) : posts;

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategorie(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            !categorie ? "border-amber-600 bg-amber-600 text-navy-950" : "border-navy-200 text-navy-700"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setCategorie(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              categorie === cat ? "border-amber-600 bg-amber-600 text-navy-950" : "border-navy-200 text-navy-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-14">
        {filtered.length === 0 ? (
          <p className="rounded-3xl border border-navy-100 bg-navy-50 p-8 text-center text-navy-600">
            Aucun article dans cette catégorie pour le moment. Consultez tous les articles ou contactez-nous
            directement pour vos questions.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 6) * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden card-shadow rounded-3xl border border-navy-100 bg-white transition hover:border-amber-400"
                >
                  {post.image ? (
                    <div className="aspect-video w-full overflow-hidden rounded-t-3xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-t-3xl border-2 border-dashed border-navy-200 bg-navy-50 text-navy-400">
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-xs">Image à venir</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                      {post.category}
                    </span>
                    <p className="mt-4 font-heading text-base text-navy-900">{post.title}</p>
                    <p className="mt-2 flex-1 text-sm text-navy-600">{post.excerpt}</p>
                    <span className="mt-4 text-xs text-navy-400">
                      {new Date(post.date).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
