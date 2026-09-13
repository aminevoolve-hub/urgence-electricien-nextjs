import { site } from "@/lib/site";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Urgence Électricien MTL",
    description: "Service électricien d'urgence 24/7 Montréal - Diagnostic gratuit, réponse en moins d'une heure",
    areaServed: [
      {
        "@type": "City",
        name: "Montréal",
      },
      {
        "@type": "City",
        name: "Laval",
      },
      {
        "@type": "City",
        name: "Longueuil",
      },
      {
        "@type": "City",
        name: "Brossard",
      },
      {
        "@type": "City",
        name: "Terrebonne",
      },
    ],
    telephone: site.phone,
    url: site.url,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(site.googleRating),
      ratingCount: String(site.googleReviewCount),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
