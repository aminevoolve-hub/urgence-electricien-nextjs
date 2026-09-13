import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import { getVideo } from "@/lib/images";
import StatsBar from "@/components/home/stats-bar";
import IntroSection from "@/components/home/intro-section";
import ValuesGrid from "@/components/values-grid";
import ServicesGrid from "@/components/services-grid";
import WhyUs from "@/components/why-us";
import ProcessStepper from "@/components/process-stepper";
import TestimonialsMarquee from "@/components/testimonials-marquee";
import BlogPreview from "@/components/blog-preview";
import FaqAccordion from "@/components/faq-accordion";
import CtaSection from "@/components/cta-section";
import SchemaMarkup from "@/components/schema-markup";
import { homeFaq } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Dépannage électrique d'urgence 24/7 Montréal | CMEQ",
  description:
    "Électricien d'urgence licencié CMEQ à Montréal: réponse en moins d'une heure, diagnostic gratuit, prix transparent. Appel immédiat 24/7, 365 jours/an.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const heroVideo = getVideo("electricien-commercial-montreal");

  return (
    <>
      <SchemaMarkup />
      <div className="-mt-20">
        <Hero videoSrc={heroVideo} />
      </div>
      <StatsBar />
      <IntroSection />
      <ValuesGrid />
      <ServicesGrid />
      <WhyUs />
      <ProcessStepper />
      <TestimonialsMarquee />
      <BlogPreview />
      <FaqAccordion items={homeFaq} />
      <CtaSection />
    </>
  );
}
