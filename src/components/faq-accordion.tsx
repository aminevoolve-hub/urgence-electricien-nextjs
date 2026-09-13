"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionContainer from "./section-container";
import AnimatedHeading from "./animated-heading";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({
  items,
  title = "Questions fréquentes",
}: {
  items: FaqItem[];
  title?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="py-20">
      <SectionContainer className="max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AnimatedHeading as="h2" text={title} className="font-heading text-3xl text-navy-900" />
        <div className="mt-8 divide-y divide-navy-100 rounded-2xl border border-navy-100">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-medium text-navy-900">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-amber-600 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-6 text-sm text-navy-600">
                    <span className="block pb-4">{item.answer}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
