import type { Metadata } from "next";
import { Outfit, Russo_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { getImage } from "@/lib/images";
import { QuoteModalProvider } from "@/context/quote-modal-context";
import QuoteModal from "@/components/quote-modal";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileActionBar from "@/components/mobile-action-bar";
import Chatbot from "@/components/chatbot";
import BackToTop from "@/components/back-to-top";
import ColorLoader from "@/components/color-loader";

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
    default: `${site.name} | Électricien d'urgence 24/7 à Montréal`,
    template: `%s | ${site.name}`,
  },
  description:
    "Électricien d'urgence licencié à Montréal, disponible 24/7. Panne électrique, disjoncteur qui saute, panneau, prises : réponse en moins d'une heure, diagnostic gratuit, prix transparent.",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logoUrl = (await getImage("brand", "logo")) ?? "/images/brand/logo.png";

  return (
    <html lang="fr-CA">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const colors = JSON.parse(localStorage.getItem('siteColors'));
                  if (colors) {
                    const root = document.documentElement;
                    root.style.setProperty('--amber-400', colors.accent);
                    root.style.setProperty('--amber-500', colors.accent);
                    root.style.setProperty('--amber-600', colors.accent);
                    const style = document.createElement('style');
                    style.textContent = ':root { --amber-400: ' + colors.accent + ' !important; --amber-500: ' + colors.accent + ' !important; --amber-600: ' + colors.accent + ' !important; }';
                    document.head.appendChild(style);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${russoOne.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <ColorLoader />
        <QuoteModalProvider>
          <Header logoUrl={logoUrl} />
          <main className="pb-16 pt-20 lg:pb-0">{children}</main>
          <Footer logoUrl={logoUrl} />
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
