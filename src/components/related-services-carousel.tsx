"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import Reveal from "./reveal";

type RelatedService = { slug: string; name: string; icon: ReactNode };

export default function RelatedServicesCarousel({
  services,
  images,
}: {
  services: RelatedService[];
  images: Record<string, string | undefined>;
}) {
  const [start, setStart] = useState(0);
  const visible = 3;
  const canPrev = start > 0;
  const canNext = start + visible < services.length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(start, start + visible).map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex flex-col overflow-hidden card-shadow rounded-3xl border border-navy-100 bg-white transition hover:border-amber-400"
            >
              {images[s.slug] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[s.slug]} alt={s.name} className="aspect-video w-full object-cover" />
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 border-b border-dashed border-navy-200 bg-navy-50 text-navy-400">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-xs">Image à venir</span>
                </div>
              )}
              <div className="p-5">
                {s.icon}
                <p className="mt-3 font-heading text-sm text-navy-900">{s.name}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      {services.length > visible && (
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            aria-label="Services précédents"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-amber-400 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setStart((s) => Math.min(services.length - visible, s + 1))}
            disabled={!canNext}
            aria-label="Services suivants"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-amber-400 disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
