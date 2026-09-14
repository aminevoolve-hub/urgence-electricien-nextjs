import type { Metadata } from "next";
import { BookOpen, Zap, ShieldCheck } from "lucide-react";
import SectionContainer from "@/components/section-container";
import CtaSection from "@/components/cta-section";
import PageHeader from "@/components/page-header";
import FeatureRow from "@/components/feature-row";
import BlogList from "@/components/blog-list";
import { blogCategories } from "@/lib/blog";
import { getPosts } from "@/lib/blog-store";
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
    description: "Chaque article s'appuie sur des interventions réelles réalisées dans le Grand Montréal.",
  },
];

export const metadata: Metadata = {
  title: "Blog | Conseils d'électricien d'urgence à Montréal",
  description:
    "Conseils d'électricien d'urgence : pannes électriques, disjoncteurs, panneau, sécurité et mises aux normes à Montréal, Laval, Longueuil et sur les Rives.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const blogPosts = await getPosts();
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
        description="Conseils pratiques d'un électricien d'urgence pour les propriétaires et commerces du Grand Montréal : pannes, sécurité, panneau électrique et mises aux normes."
        breadcrumbs={[{ label: "Blog" }]}
      />
      <SectionContainer className="pb-20 pt-14">
        <p className="mx-auto max-w-2xl text-center text-navy-600">
          Des réponses concrètes aux questions les plus fréquentes de nos clients : coûts, délais, mises à niveau et
          obligations légales. Filtrez par catégorie pour trouver l&apos;article qui correspond à votre situation.
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
