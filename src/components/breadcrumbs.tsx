import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  light = false,
  centered = false,
}: {
  items: Crumb[];
  light?: boolean;
  centered?: boolean;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: item.href ? `${site.url}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`mx-auto max-w-6xl px-4 py-4 text-sm lg:px-8 ${light ? "text-navy-300" : "text-navy-500"}`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className={`flex flex-wrap items-center gap-1 ${centered ? "justify-center" : ""}`}>
        <li>
          <Link href="/" className="hover:text-amber-500">
            Accueil
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.href ? (
              <Link href={item.href} className="hover:text-amber-500">
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-navy-800"}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
