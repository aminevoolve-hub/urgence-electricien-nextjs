import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import SectionContainer from "@/components/section-container";
import PageHeader from "@/components/page-header";
import ProcessStepper from "@/components/process-stepper";
import FaqAccordion from "@/components/faq-accordion";
import CtaSection from "@/components/cta-section";
import ImageSlot from "@/components/image-slot";
import RelatedServicesCarousel from "@/components/related-services-carousel";
import { getImage } from "@/lib/images";
import AnimatedHeading from "@/components/animated-heading";
import Reveal from "@/components/reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const otherServiceImages: Record<string, string | undefined> = {};
  for (const s of otherServices) {
    otherServiceImages[s.slug] = (await getImage("services", s.slug)) ?? undefined;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    provider: { "@type": "ElectricalContractor", name: site.name, url: site.url },
    areaServed: "Grand Montréal",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title={service.name}
        description={service.heroDescription}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}
        icon={service.icon}
        quoteService={service.name}
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
        <SectionContainer className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ImageSlot section="services" name={service.slug} alt={service.name} className="aspect-square w-full lg:aspect-auto" />
          <div className="space-y-5 text-navy-700">
            {service.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-20">
        <SectionContainer>
          <AnimatedHeading as="h2" text="Ce que comprend ce service" className="font-heading text-3xl text-navy-900" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {service.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="card-shadow rounded-3xl border border-navy-100 p-6">
                <p className="font-heading text-lg text-navy-900">{f.title}</p>
                <p className="mt-2 text-sm text-navy-600">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <ProcessStepper title="Notre processus" steps={service.process} />

      <FaqAccordion title="Questions fréquentes sur ce service" items={service.faq} />

      <section className="bg-gradient-navy-soft py-16">
        <SectionContainer>
          <AnimatedHeading as="h2" text="Autres services" className="font-heading text-2xl text-navy-900" />
          <div className="mt-6">
            <RelatedServicesCarousel
              services={otherServices.map((s) => ({
                slug: s.slug,
                name: s.name,
                icon: <s.icon className="h-6 w-6 text-amber-600" />,
              }))}
              images={otherServiceImages}
            />
          </div>
        </SectionContainer>
      </section>

      <CtaSection title={`Un projet de ${service.name.toLowerCase()} ?`} />
    </>
  );
}
