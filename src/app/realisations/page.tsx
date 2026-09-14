import type { Metadata } from "next";
import SectionContainer from "@/components/section-container";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import Gallery from "@/components/gallery";
import { projects } from "@/lib/projects";
import { getImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Réalisations | Interventions électriques à Montréal",
  description:
    "Découvrez nos interventions d'urgence et travaux électriques réalisés à Montréal, Laval, Longueuil et sur les Rives : dépannage, panneaux, disjoncteurs, installations.",
  alternates: { canonical: "/realisations" },
};

export default async function RealisationsPage() {
  const images: Record<string, string | undefined> = {};
  for (const project of projects) {
    images[project.image] = (await getImage("projects", project.image)) ?? undefined;
  }

  return (
    <>
      <PageHeader
        title="Nos réalisations"
        description="Nos interventions d'urgence et travaux électriques dans le Grand Montréal."
        breadcrumbs={[{ label: "Réalisations" }]}
      />
      <SectionContainer className="py-14">
        <Gallery projects={projects} images={images} />
      </SectionContainer>
      <CtaSection />
    </>
  );
}
