"use client";

import { useEffect, useState } from "react";
import { Phone, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import type { VideoSources } from "@/lib/images";
import QuoteTriggerButton from "../quote-trigger-button";
import AnimatedHeading from "../animated-heading";

const titles = [
  "Panne électrique ? On arrive en moins d'une heure.",
  "Dépannage d'urgence 24/7 à Montréal",
  "Diagnostic gratuit, prix transparent",
  "Électricien licencié CMEQ, disponible maintenant",
];

export default function Hero({ videoSrc }: { videoSrc?: VideoSources }) {
  const [index, setIndex] = useState(0);
  const hasVideo = Boolean(videoSrc?.webm || videoSrc?.mp4);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % titles.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-gradient-navy relative flex min-h-[70vh] items-center overflow-hidden py-24 text-white">
      {hasVideo ? (
        <>
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline aria-hidden>
            {videoSrc?.webm && <source src={videoSrc.webm} type="video/webm" />}
            {videoSrc?.mp4 && <source src={videoSrc.mp4} type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/70 to-navy-950/40" aria-hidden />
        </>
      ) : (
        <>
          <div
            className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-navy-600 opacity-40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-amber-600 opacity-30 blur-3xl"
            aria-hidden
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl px-4 py-32 text-center sm:px-8">
        <h1 className="glass mx-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-400">
          <Zap className="h-3.5 w-3.5" /> Électricien 24/7 Montréal
        </h1>

        <div className="mx-auto mt-8 flex min-h-[116px] max-w-3xl items-center justify-center sm:min-h-[192px]">
          <AnimatedHeading
            key={index}
            as="h2"
            text={titles[index]}
            className="font-heading text-4xl leading-[1.05] sm:text-6xl"
          />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-lg text-navy-200">
          Dépannage électrique d'urgence 24/7. Électricien licencié CMEQ, diagnostic gratuit, prix transparent. Pas de surcharge pour urgence.
        </p>

        <div className="mt-10 flex flex-nowrap items-center justify-center gap-3 sm:gap-4">
          <QuoteTriggerButton className="btn-gradient flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-950 transition sm:px-8 sm:py-4 sm:text-base">
            Appeler d'urgence <ArrowRight className="h-4 w-4 shrink-0" />
          </QuoteTriggerButton>
          <a
            href={`tel:${site.phone}`}
            className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base"
          >
            <Phone className="h-4 w-4 shrink-0" /> {site.phoneDisplay}
          </a>
        </div>

        <p className="mt-10 text-sm text-navy-300">Réponse garantie en moins d'une heure, 24/7</p>
      </div>

      <button
        onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Défiler vers la section suivante"
        className="animate-float absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white"
      >
        <span className="text-xs text-navy-200">Cliquez ici pour en savoir plus</span>
        <span className="glass flex h-10 w-10 items-center justify-center rounded-full">
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
    </section>
  );
}
