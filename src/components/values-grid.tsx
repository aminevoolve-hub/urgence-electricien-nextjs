'use client';

import { ArrowUpRight } from "lucide-react";
import { values } from "@/lib/faq";
import { getImage } from "@/lib/images";
import { usePageImages, getImageByElement } from "@/lib/usePageImages";
import SectionContainer from "./section-container";
import Reveal from "./reveal";
import AnimatedHeading from "./animated-heading";

export default function ValuesGrid({ title = "Nos valeurs" }: { title?: string }) {
  const adminImages = usePageImages("home", "valeurs");

  return (
    <section className="bg-gradient-navy-soft py-20">
      <SectionContainer>
        <AnimatedHeading as="h2" text={title} className="font-heading text-3xl text-navy-900" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {values.map((v, i) => {
            // First check admin dashboard for image (by element name), then fallback to server files
            const adminImage = getImageByElement(adminImages, v.title);
            const image = adminImage || getImage("valeurs", v.slug);
            return (
              <Reveal
                key={v.title}
                delay={i * 0.06}
                className="card-shadow group relative aspect-3/4 overflow-hidden rounded-3xl bg-navy-900"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={v.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <v.icon className="h-10 w-10 text-navy-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent" />
                <p className="absolute bottom-5 left-5 right-14 font-heading text-sm text-amber-400 sm:text-base">
                  {v.title}
                </p>
                <span className="btn-gradient absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-navy-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Reveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
