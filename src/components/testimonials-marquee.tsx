"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials } from "@/lib/testimonials";
import SectionContainer from "./section-container";
import AnimatedHeading from "./animated-heading";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsMarquee() {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total]);

  const current = testimonials[index];
  const prev = testimonials[(index - 1 + total) % total];
  const next = testimonials[(index + 1) % total];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="overflow-hidden bg-gradient-navy-soft py-20">
      <SectionContainer>
        <div className="relative flex items-center justify-center">
          <AnimatedHeading as="h2" text="Ce que disent nos clients" className="font-heading text-3xl text-navy-900 text-center" />
          <div className="absolute right-0 hidden gap-2 sm:flex">
            <button
              onClick={goPrev}
              aria-label="Témoignage précédent"
              className="glass-light flex h-10 w-10 items-center justify-center rounded-full text-navy-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Témoignage suivant"
              className="glass-light flex h-10 w-10 items-center justify-center rounded-full text-navy-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-16" style={{ perspective: "1400px" }}>
          <div className="relative mx-auto h-72 max-w-xl sm:h-64">
            <div
              className="glass-light absolute inset-y-2 left-0 hidden w-full rounded-3xl p-8 opacity-40 sm:block"
              style={{ transform: "translateX(-92%) scale(0.92)" }}
              aria-hidden
            >
              <p className="font-heading text-sm text-navy-900">{prev.name}</p>
              <p className="mt-3 line-clamp-4 text-navy-700">&ldquo;{prev.quote}&rdquo;</p>
            </div>
            <div
              className="glass-light absolute inset-y-2 right-0 hidden w-full rounded-3xl p-8 opacity-40 sm:block"
              style={{ transform: "translateX(92%) scale(0.92)" }}
              aria-hidden
            >
              <p className="font-heading text-sm text-navy-900">{next.name}</p>
              <p className="mt-3 line-clamp-4 text-navy-700">&ldquo;{next.quote}&rdquo;</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 36, rotate: -3, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -36, rotate: 3, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) goNext();
                  else if (info.offset.x > 60) goPrev();
                }}
                className="card-shadow glass-light absolute inset-0 flex touch-pan-y flex-col justify-center rounded-3xl p-8 active:cursor-grabbing"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-100 font-heading text-sm text-navy-700">
                    {initials(current.name)}
                  </div>
                  <div>
                    <p className="font-heading text-sm text-navy-900">{current.name}</p>
                    <p className="text-xs text-navy-500">{current.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: current.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="mt-3 line-clamp-4 text-navy-700">&ldquo;{current.quote}&rdquo;</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Témoignage de ${t.name}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-amber-600" : "w-2 bg-navy-200"}`}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
