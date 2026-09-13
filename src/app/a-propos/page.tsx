import type { Metadata } from "next";
import { CheckCircle2, GraduationCap, Thermometer, Radar } from "lucide-react";
import SectionContainer from "@/components/section-container";
import AboutSectionNav from "@/components/about/section-nav";
import ProcessStepper from "@/components/process-stepper";
import ValuesGrid from "@/components/values-grid";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import ImageSlot from "@/components/image-slot";
import FeatureRow from "@/components/feature-row";
import AnimatedHeading from "@/components/animated-heading";
import Reveal from "@/components/reveal";
import { site } from "@/lib/site";
import { whyUs } from "@/lib/faq";

const visionPillars = [
  {
    icon: GraduationCap,
    title: "Électricien licencié CMEQ",
    description: "Formation continue aux normes actuelles. Tous les travaux sont conformes CMEQ, avec inspection incluse si requis.",
  },
  {
    icon: Thermometer,
    title: "Diagnostic sur place",
    description: "Identification rapide et précise du problème électrique, avec explication claire et devis transparent avant réparation.",
  },
  {
    icon: Radar,
    title: "Disponibilité 24/7",
    description: "Panne à 3 h du matin un dimanche : on arrive, on diagnostic, on répare. Pas de surcharge pour urgence.",
  },
];

export const metadata: Metadata = {
  title: "À Propos | Électricien d'Urgence Licencié CMEQ Montréal",
  description:
    "Électricien spécialisé en dépannage d'urgence 24/7 à Montréal depuis 2010. CMEQ licencié, disponibilité garantie, diagnostic gratuit.",
  alternates: { canonical: "/a-propos" },
};

const sections = [
  { id: "histoire", label: "Notre histoire" },
  { id: "vision", label: "Notre vision" },
  { id: "differenciateurs", label: "Différenciateurs" },
  { id: "satisfaction", label: "Satisfaction client" },
  { id: "valeurs", label: "Nos valeurs" },
  { id: "approche", label: "Notre approche" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`À propos`}
        description={`Électricien d'urgence 24/7 licencié CMEQ à Montréal. Réponse garantie en moins d'une heure, diagnostic gratuit, prix transparent.`}
        breadcrumbs={[{ label: "À propos" }]}
      />

      <div className="mt-8 hidden lg:sticky lg:top-32 lg:z-30 lg:block">
        <SectionContainer>
          <AboutSectionNav sections={sections} />
        </SectionContainer>
      </div>

      <section id="histoire" className="scroll-mt-32 py-16">
        <SectionContainer className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ImageSlot section="about" name="histoire" alt="Notre équipe" className="aspect-square w-full lg:aspect-auto" />
          <div className="space-y-5 text-navy-600">
          <AnimatedHeading as="h2" text="Notre histoire" className="font-heading text-3xl text-navy-900" />
          <p>
            J'ai commencé comme électricien indépendant à Montréal en répondant à des appels d'urgence le soir et les fins de semaine.
            Je constatais rapidement que la plupart des gens appelaient tard parce qu'il n'y avait personne de disponible 24/7,
            et quand on trouvait quelqu'un, les frais étaient énormes — surcharge de nuit, surcharge de fin de semaine.
          </p>
          <p>
            J'ai décidé alors de me spécialiser en dépannage électrique d'urgence au grand Montréal. Pas de commercial, pas d'industriel,
            juste les urgences résidentielles et petits commerces : panneau qui saute, disjoncteur défectueux, prise qui ne marche plus,
            diagnostic de panne. Rapidement, la demande a grandi — les gens appelaient parce qu'ils savaient qu'on arrivait vraiment en moins d'une heure.
          </p>
          <p>
            Aujourd'hui, je suis un électricien licencié CMEQ disponible 24/7 à Montréal, Laval, Longueuil et région,
            avec un objectif simple : diagnostic gratuit, prix transparent, pas de surcharge pour urgence, et réponse garantie en moins d'une heure.
          </p>
          </div>
        </SectionContainer>
      </section>

      <section id="vision" className="scroll-mt-32 py-16">
        <SectionContainer>
          <AnimatedHeading as="h2" text="Notre engagement" className="font-heading text-3xl text-navy-900" />
          <p className="mt-4 max-w-2xl text-navy-600">
            Être l'électricien d'urgence fiable au Grand Montréal : réponse garantie en moins d'une heure,
            diagnostic gratuit, travaux conformes CMEQ, et prix transparent sans surcharge pour urgence.
          </p>
          <div className="mt-10">
            <FeatureRow items={visionPillars} />
          </div>
        </SectionContainer>
      </section>

      <section id="differenciateurs" className="scroll-mt-32 py-16">
        <SectionContainer>
          <AnimatedHeading as="h2" text="Ce qui nous différencie" className="font-heading text-3xl text-navy-900" />
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="flex gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
                <div>
                  <p className="font-heading text-base text-navy-900">{item.title}</p>
                  <p className="mt-1 text-sm text-navy-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="satisfaction" className="scroll-mt-32 bg-gradient-navy py-16 text-white">
        <SectionContainer className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Reveal className="glass rounded-3xl px-6 py-8 text-center">
            <p className="font-heading text-4xl text-amber-500">{site.googleRating}/5</p>
            <p className="mt-2 text-sm text-navy-300">Note moyenne Google</p>
          </Reveal>
          <Reveal delay={0.06} className="glass rounded-3xl px-6 py-8 text-center">
            <p className="font-heading text-4xl text-amber-500">{site.googleReviewCount}+</p>
            <p className="mt-2 text-sm text-navy-300">Avis clients vérifiés</p>
          </Reveal>
          <Reveal delay={0.12} className="glass rounded-3xl px-6 py-8 text-center">
            <p className="font-heading text-4xl text-amber-500">98%</p>
            <p className="mt-2 text-sm text-navy-300">Clients qui nous recommandent</p>
          </Reveal>
        </SectionContainer>
      </section>

      <div id="valeurs" className="scroll-mt-32">
        <ValuesGrid title="Nos valeurs" />
      </div>

      <div id="approche" className="scroll-mt-32">
        <ProcessStepper title="Notre approche" />
      </div>

      <CtaSection />
    </>
  );
}
