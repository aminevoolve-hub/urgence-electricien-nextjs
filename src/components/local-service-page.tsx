import { MapPin, Phone, Newspaper } from "lucide-react";
import type { LocalPage } from "@/lib/local-pages";
import { getPost } from "@/lib/blog-store";
import { localPages } from "@/lib/local-pages";
import { site } from "@/lib/site";
import SectionContainer from "./section-container";
import PageHeader from "./page-header";
import FaqAccordion from "./faq-accordion";
import CtaSection from "./cta-section";
import AnimatedHeading from "./animated-heading";
import Reveal from "./reveal";
import LinkCardsCarousel from "./link-cards-carousel";

export default async function LocalServicePage({ page }: { page: LocalPage }) {
  const otherPages = localPages.filter((p) => p.slug !== page.slug);
  const relatedPosts = (await Promise.all(page.relatedBlogSlugs.map((slug) => getPost(slug)))).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.metaDescription,
    provider: { "@type": "ElectricalContractor", name: site.name, url: site.url },
    areaServed: page.isUrgence ? "Grand Montréal" : page.h1.replace("Électricien ", ""),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title={page.h1}
        description={page.heroDescription}
        breadcrumbs={[{ label: page.h1 }]}
        icon={page.isUrgence ? Phone : MapPin}
        secondaryAction={
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 sm:px-6 sm:text-base"
          >
            <Phone className="h-4 w-4 shrink-0" /> {site.phoneDisplay}
          </a>
        }
      />

      <section className="py-16">
        <SectionContainer className="max-w-3xl space-y-5 text-navy-700">
          {page.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </SectionContainer>
      </section>

      <section className="py-16">
        <SectionContainer>
          <AnimatedHeading as="h2" text={page.servicesTitle} className="font-heading text-3xl text-navy-900" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="card-shadow rounded-3xl border border-navy-100 p-6">
                <p className="font-heading text-lg text-navy-900">{s.title}</p>
                <p className="mt-2 text-sm text-navy-600">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="bg-gradient-navy-soft py-16">
        <SectionContainer className="max-w-3xl space-y-5">
          <AnimatedHeading as="h2" text={page.anchorTitle} className="font-heading text-3xl text-navy-900" />
          <div className="space-y-4 text-navy-700">
            {page.anchorParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-20">
        <SectionContainer>
          <AnimatedHeading as="h2" text={page.whyUsTitle} className="font-heading text-3xl text-navy-900" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {page.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06} className="card-shadow rounded-3xl border border-navy-100 p-6">
                <p className="font-heading text-lg text-navy-900">{w.title}</p>
                <p className="mt-2 text-sm text-navy-600">{w.description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <FaqAccordion title={`Questions fréquentes`} items={page.faq} />

      <section className="py-16">
        <SectionContainer className="max-w-4xl">
          <AnimatedHeading as="h2" text="Pour aller plus loin" className="font-heading text-2xl text-navy-900" />
          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold text-navy-500">Nos zones de service</p>
            <LinkCardsCarousel
              items={otherPages.map((p) => ({
                href: `/${p.slug}`,
                title: p.h1,
                description: p.heroDescription,
                icon: p.isUrgence ? <Phone className="h-5 w-5" /> : <MapPin className="h-5 w-5" />,
              }))}
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <p className="mb-4 text-sm font-semibold text-navy-500">Articles liés</p>
              <LinkCardsCarousel
                items={relatedPosts.map((post) => ({
                  href: `/blog/${post.slug}`,
                  title: post.title,
                  description: post.excerpt,
                  icon: <Newspaper className="h-5 w-5" />,
                }))}
              />
            </div>
          )}
        </SectionContainer>
      </section>

      <CtaSection
        title={page.isUrgence ? "Une urgence électrique ?" : `Un projet électrique à ${page.h1.replace("Électricien ", "")} ?`}
        description="Obtenez une soumission gratuite et sans engagement, ou appelez directement notre équipe."
      />
    </>
  );
}
