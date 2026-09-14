import type { Metadata } from "next";
import { BookOpen, Zap, ShieldCheck } from "lucide-react";
import SectionContainer from "@/components/section-container";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import FeatureRow from "@/components/feature-row";
import BlogList from "@/components/blog-list";
import { blogPosts, blogCategories } from "@/lib/blog";
import { getImage } from "@/lib/images";

const BLOG_FALLBACK_IMAGE = "blog-electricien-commercial-montreal";

const highlights = [
  {
    icon: BookOpen,
    title: "Guides d'experts",
    description: "Des guides pratiques rédigés par notre équipe d'électriciens licenciés RBQ.",
  },
  {
    icon: Zap,
    title: "Conseils concrets",
    description: "Coûts, délais et obligations légales expliqués simplement, sans jargon technique.",
  },
  {
    icon: ShieldCheck,
    title: "Basé sur l'expérience terrain",
    description: "Chaque article s'appuie sur des projets réels réalisés dans le Grand Montréal.",
  },
];

export const metadata: Metadata = {
  title: "Blog | Conseils en électricité commerciale à Montréal",
  description:
    "Articles et conseils d'experts sur l'installation électrique commerciale, l'éclairage DEL, l'entretien préventif et les bornes de recharge VE à Montréal.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const fallbackImage = await getImage("blog", BLOG_FALLBACK_IMAGE);
  const posts = await Promise.all(
    blogPosts.map(async (p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.date,
      image: (await getImage("blog", p.slug)) ?? fallbackImage,
    }))
  );

  return (
    <>
      <PageHeader
        title="Blog"
        description="Conseils pratiques sur l'électricité commerciale et industrielle pour les entreprises du Grand Montréal, écrits par notre équipe d'électriciens licenciés RBQ."
        breadcrumbs={[{ label: "Blog" }]}
      />
      <SectionContainer className="pb-20 pt-14">
        <p className="mx-auto max-w-2xl text-center text-navy-600">
          Des réponses concrètes aux questions les plus fréquentes de nos clients : coûts, délais, mises à niveau et
          obligations légales. Filtrez par catégorie pour trouver l&apos;article qui correspond à votre projet.
        </p>
        <div className="mt-10">
          <FeatureRow items={highlights} />
        </div>

        <BlogList posts={posts} categories={blogCategories} />
      </SectionContainer>
      <CtaSection />
    </>
  );
}
