export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  updated?: string;
  keywords: string[];
  relatedServiceSlug: string;
  relatedLocalPageSlugs?: string[];
  // Blocks: "## " h2, "### " h3, "- " list item, otherwise a paragraph. Inline: [text](href), **bold**.
  content: string[];
  faq?: BlogFaq[];
};
