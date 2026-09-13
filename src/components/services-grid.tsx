import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import SectionContainer from "./section-container";
import Reveal from "./reveal";
import ImageSlot from "./image-slot";
import AnimatedHeading from "./animated-heading";

export default function ServicesGrid() {
  return (
    <section className="bg-gradient-navy-soft py-20">
      <SectionContainer>
        <AnimatedHeading as="h2" text="Nos services" className="font-heading text-3xl text-navy-900" />
        <p className="mt-3 max-w-2xl text-navy-600">
          Une gamme complète de services électriques pensée pour les commerces et industries de la région
          métropolitaine de Montréal.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden card-shadow rounded-3xl border border-navy-100 bg-white transition hover:border-amber-400"
              >
                <ImageSlot section="services" name={s.slug} alt={s.name} className="aspect-video w-full" />
                <div className="flex flex-1 flex-col p-7">
                  <span className="icon-badge flex h-12 w-12 items-center justify-center rounded-full text-navy-950">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 font-heading text-lg text-navy-900">{s.name}</p>
                  <p className="mt-2 flex-1 text-sm text-navy-600">{s.shortDescription}</p>
                  <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-amber-600">
                    En savoir plus <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
