export type LocalPageService = { title: string; description: string };

export type LocalPageFaq = { question: string; answer: string };

export type LocalPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  intro: string[];
  servicesTitle: string;
  services: LocalPageService[];
  anchorTitle: string;
  anchorParagraphs: string[];
  whyUsTitle: string;
  whyUs: LocalPageService[];
  faq: LocalPageFaq[];
  keywords: string[];
  relatedBlogSlugs: string[];
  isUrgence?: boolean;
};

export const localPages: LocalPage[] = [];

export function getLocalPageBySlug(slug: string) {
  return localPages.find((p) => p.slug === slug);
}
