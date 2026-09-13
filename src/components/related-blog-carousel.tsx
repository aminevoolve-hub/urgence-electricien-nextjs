"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type RelatedPost = { slug: string; title: string; excerpt: string; category: string; image: string | undefined };

const PAGE_SIZE = 3;

export default function RelatedBlogCarousel({ posts }: { posts: RelatedPost[] }) {
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (pageCount <= 1) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pageCount), 5000);
    return () => clearInterval(id);
  }, [pageCount]);

  const current = posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      <div className="relative min-h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {current.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group card-shadow flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white transition hover:border-amber-400"
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} className="aspect-video w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">{p.category}</span>
                  <p className="mt-3 font-heading text-sm text-navy-900">{p.title}</p>
                  <p className="mt-2 flex-1 text-xs text-navy-600">{p.excerpt}</p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-navy-900 group-hover:text-amber-600">
                    Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            aria-label="Articles précédents"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-amber-600" : "w-2 bg-navy-200"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => (p + 1) % pageCount)}
            aria-label="Articles suivants"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
