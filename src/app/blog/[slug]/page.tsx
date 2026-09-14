import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { getServiceBySlug } from "@/lib/services";
import { getLocalPageBySlug } from "@/lib/local-pages";
import { site } from "@/lib/site";
import { getImage } from "@/lib/images";
import SectionContainer from "@/components/section-container";
import CtaSection from "@/components/cta-section";
import ImageSlot from "@/components/image-slot";
import PageHeader from "@/components/page-header";
import AnimatedHeading from "@/components/animated-heading";
import RelatedBlogCarousel from "@/components/related-blog-carousel";

const BLOG_FALLBACK_IMAGE = "blog-electricien-commercial-montreal";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedService = getServiceBySlug(post.relatedServiceSlug);
  const relatedLocalPages = (post.relatedLocalPageSlugs ?? [])
    .map((s) => getLocalPageBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 6);
  const fallbackImage = await getImage("blog", BLOG_FALLBACK_IMAGE);
  const otherPostsWithImages = await Promise.all(
    otherPosts.map(async (p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      image: (await getImage("blog", p.slug)) ?? fallbackImage ?? undefined,
    }))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <SectionContainer className="max-w-3xl py-14">
        <div className="flex items-center gap-3">
          <span className="w-fit rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">{post.category}</span>
          <p className="text-sm text-navy-500">
            {new Date(post.date).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <ImageSlot
          section="blog"
          name={post.slug}
          fallback={BLOG_FALLBACK_IMAGE}
          alt={post.title}
          className="mt-6 aspect-video w-full"
        />

        <div className="mt-8 space-y-5 text-navy-700">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {relatedService && (
          <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <p className="font-heading text-base text-navy-900">Besoin d&apos;aide pour {relatedService.name.toLowerCase()} ?</p>
            <p className="mt-2 text-sm text-navy-600">{relatedService.shortDescription}</p>
            <Link href={`/services/${relatedService.slug}`} className="mt-4 inline-block text-sm font-semibold text-amber-700 hover:text-amber-600">
              Découvrir ce service →
            </Link>
          </div>
        )}

        {relatedLocalPages.length > 0 && (
          <div className="mt-6 rounded-3xl border border-navy-100 bg-navy-50 p-6">
            <p className="font-heading text-base text-navy-900">Un projet dans votre secteur ?</p>
            <ul className="mt-3 space-y-2">
              {relatedLocalPages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="text-sm font-semibold text-amber-700 hover:text-amber-600">
                    {p.h1} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionContainer>

      <section className="bg-gradient-navy-soft py-16">
        <SectionContainer>
          <AnimatedHeading as="h2" text="À lire aussi" className="font-heading text-2xl text-navy-900" />
          <div className="mt-6">
            <RelatedBlogCarousel posts={otherPostsWithImages} />
          </div>
        </SectionContainer>
      </section>

      <CtaSection />
    </>
  );
}
