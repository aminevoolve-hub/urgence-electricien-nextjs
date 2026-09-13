import type { Metadata } from "next";
import { Outfit, Russo_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { QuoteModalProvider } from "@/context/quote-modal-context";
import QuoteModal from "@/components/quote-modal";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileActionBar from "@/components/mobile-action-bar";
import Chatbot from "@/components/chatbot";
import BackToTop from "@/components/back-to-top";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Électricien commercial et industriel à Montréal`,
    template: `%s | ${site.name}`,
  },
  description:
    "Électricien commercial et industriel licencié RBQ à Montréal. Installations, éclairage DEL, entretien, thermographie, bornes de recharge VE. Soumission gratuite.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: site.name,
    url: site.url,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: "Grand Montréal",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.googleRating,
    reviewCount: site.googleReviewCount,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA">
      <body className={`${outfit.variable} ${russoOne.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <QuoteModalProvider>
          <Header />
          <main className="pb-16 pt-20 lg:pb-0">{children}</main>
          <Footer />
          <MobileActionBar />
          <Chatbot />
          <BackToTop />
          <QuoteModal />
        </QuoteModalProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-K5ZTW90J4T" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5ZTW90J4T');
          `}
        </Script>
      </body>
    </html>
  );
}
