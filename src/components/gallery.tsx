"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { Project } from "@/lib/projects";
import { getServiceBySlug } from "@/lib/services";
import Reveal from "./reveal";
import { usePageImages } from "@/lib/usePageImages";

const PLACEHOLDER_HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-72"];

function ProjectVisual({ project, image, adminImage, tall }: { project: Project; image?: string; adminImage?: string; tall?: string }) {
  const displayImage = adminImage || image;
  if (displayImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={displayImage} alt={project.title} className="h-full w-full object-cover" />;
  }
  const service = getServiceBySlug(project.serviceSlug);
  const Icon = service?.icon ?? ImageOff;
  return (
    <div className={`flex w-full flex-col items-center justify-center gap-3 bg-navy-950 ${tall ?? "h-64"}`}>
      <Icon className="h-8 w-8 text-amber-500" />
    </div>
  );
}

export default function Gallery({
  projects,
  images,
}: {
  projects: Project[];
  images: Record<string, string | undefined>;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const adminImages = usePageImages("realisations", "portfolio");

  function close() {
    setActiveIndex(null);
  }
  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % projects.length));
  }
  function prev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + projects.length) % projects.length));
  }

  const active = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 6) * 0.06} className="mb-6 break-inside-avoid">
            <button onClick={() => setActiveIndex(i)} className="group block w-full text-left">
              <div className="relative overflow-hidden card-shadow rounded-3xl border border-navy-100 transition-colors group-hover:border-amber-400">
                <ProjectVisual
                  project={project}
                  image={images[project.image]}
                  adminImage={adminImages[project.title]}
                  tall={PLACEHOLDER_HEIGHTS[i % PLACEHOLDER_HEIGHTS.length]}
                />
                <div className="absolute inset-0 flex items-end bg-navy-950/0 p-4 transition-colors group-hover:bg-navy-950/30">
                  <span className="translate-y-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    Voir le projet
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/90 p-4" onClick={close}>
          <button onClick={close} aria-label="Fermer" className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10">
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Précédent"
            className="absolute left-4 rounded-full p-2 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Suivant"
            className="absolute right-4 rounded-full p-2 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
              <ProjectVisual project={active} image={images[active.image]} adminImage={adminImages[active.title]} tall="h-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
