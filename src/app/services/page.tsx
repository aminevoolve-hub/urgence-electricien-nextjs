import type { Metadata } from "next";
import { ShieldCheck, Wrench, FileCheck } from "lucide-react";
import ServicesGrid from "@/components/services-grid";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import SectionContainer from "@/components/section-container";
import FeatureRow from "@/components/feature-row";

export const metadata: Metadata = {
  title: "Services Électricien d'Urgence 24/7 Montréal | Dépannage Rapide",
  description:
    "6 services d'urgence électrique: dépannage, panneau, disjoncteur, prise, diagnostic, rénovation. Montréal, Laval, Longueuil. Réponse garantie 1 heure.",
  alternates: { canonical: "/services" },
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "Licencié CMEQ",
    description: "Tous les travaux sont conformes aux normes actuelles CMEQ, avec inspection incluse si requis.",
  },
  {
    icon: Wrench,
    title: "Diagnostic gratuit",
    description: "Je vois le problème sur place, je te dis d'emblée ce qui se passe et le coût exact avant d'intervenir.",
  },
  {
    icon: FileCheck,
    title: "Pas de surcharge urgence",
    description: "Prix régulier 24/7, 365 jours par année. Ni frais de nuit, ni frais de fin de semaine.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services d'urgence électrique"
        description="Électricien d'urgence licencié CMEQ à Montréal : dépannage 24/7, diagnostic gratuit, réponse en moins d'une heure, prix transparent."
        breadcrumbs={[{ label: "Services" }]}
      />
      <SectionContainer className="py-14">
        <p className="mx-auto max-w-3xl text-center text-navy-600">
          Panne électrique, disjoncteur qui déclenche, danger imminent : chaque service détaille le problème,
          notre approche, le processus de diagnostic et réparation, et les questions les plus fréquentes.
        </p>
        <div className="mt-10">
          <FeatureRow items={highlights} />
        </div>
      </SectionContainer>
      <ServicesGrid />
      <CtaSection />
    </>
  );
}
