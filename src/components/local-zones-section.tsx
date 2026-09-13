import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { localPages } from "@/lib/local-pages";
import SectionContainer from "./section-container";
import Reveal from "./reveal";
import AnimatedHeading from "./animated-heading";

export default function LocalZonesSection() {
  return (
    <section className="py-20">
      <SectionContainer>
        <AnimatedHeading as="h2" text="Nos zones de service" className="font-heading text-3xl text-navy-900" />
        <p className="mt-3 max-w-2xl text-navy-600">
          En plus de Montréal, notre équipe intervient dans plusieurs villes de la région et offre un service
          électrique d&apos;urgence 24/7.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {localPages.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/${p.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-6 card-shadow transition hover:border-amber-400"
              >
                <span className="icon-badge flex h-12 w-12 items-center justify-center rounded-full text-navy-950">
                  {p.isUrgence ? <Phone className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                </span>
                <p className="mt-4 font-heading text-lg text-navy-900">{p.h1}</p>
                <p className="mt-2 flex-1 text-sm text-navy-600">{p.heroDescription}</p>
                <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-amber-600">
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
