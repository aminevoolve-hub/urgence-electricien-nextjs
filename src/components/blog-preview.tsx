import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import SectionContainer from "./section-container";
import ImageSlot from "./image-slot";
import AnimatedHeading from "./animated-heading";
import Reveal from "./reveal";

export default function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-20">
      <SectionContainer>
        <div className="flex items-end justify-between">
          <AnimatedHeading as="h2" text="Derniers articles" className="font-heading text-3xl text-navy-900" />
          <Link href="/blog" className="text-sm font-semibold text-amber-700 hover:text-amber-600">
            Voir tous les articles
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden card-shadow rounded-3xl border border-navy-100 bg-white transition hover:border-amber-400"
              >
                <ImageSlot section="blog" name={post.slug} fallback="blog-electricien-commercial-montreal" alt={post.title} className="aspect-video w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">{post.category}</span>
                  <p className="mt-3 font-heading text-base text-navy-900">{post.title}</p>
                  <p className="mt-1 flex-1 text-sm text-navy-600">{post.excerpt}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy-900 group-hover:text-amber-600">
                    Lire l&apos;article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
