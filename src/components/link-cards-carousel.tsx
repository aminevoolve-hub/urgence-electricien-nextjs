"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import Reveal from "./reveal";

type LinkCard = { href: string; title: string; description?: string; icon: ReactNode };

export default function LinkCardsCarousel({ items }: { items: LinkCard[] }) {
  const [start, setStart] = useState(0);
  const visible = 3;
  const canPrev = start > 0;
  const canNext = start + visible < items.length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(start, start + visible).map((item, i) => (
          <Reveal key={item.href} delay={i * 0.06}>
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-6 card-shadow transition hover:border-amber-400"
            >
              <span className="icon-badge flex h-11 w-11 items-center justify-center rounded-full text-navy-950">
                {item.icon}
              </span>
              <p className="mt-4 font-heading text-base text-navy-900">{item.title}</p>
              {item.description && <p className="mt-2 flex-1 text-sm text-navy-600">{item.description}</p>}
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-amber-600">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      {items.length > visible && (
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            aria-label="Précédent"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-amber-400 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setStart((s) => Math.min(items.length - visible, s + 1))}
            disabled={!canNext}
            aria-label="Suivant"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-amber-400 disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
