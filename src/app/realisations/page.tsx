import type { Metadata } from "next";
import SectionContainer from "@/components/section-container";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import Gallery from "@/components/gallery";
import { projects } from "@/lib/projects";
import { getImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Réalisations | Projets électriques commerciaux à Montréal",
  description:
    "Découvrez nos réalisations en installation électrique commerciale, éclairage DEL, entretien et bornes de recharge VE dans la région de Montréal.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  const images: Record<string, string | undefined> = {};
  for (const project of projects) {
    images[project.image] = getImage("projects", project.image) ?? undefined;
  }

  return (
    <>
      <PageHeader
        title="Nos réalisations"
        description="480+ projets commerciaux et industriels réalisés dans le Grand Montréal."
        breadcrumbs={[{ label: "Réalisations" }]}
      />
      <SectionContainer className="py-14">
        <Gallery projects={projects} images={images} />
      </SectionContainer>
      <CtaSection />
    </>
  );
}
