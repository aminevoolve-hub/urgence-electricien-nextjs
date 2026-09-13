import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import SectionContainer from "@/components/section-container";
import ContactForm from "@/components/contact-form";
import PageHeader from "@/components/page-header";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Appel d'Urgence Électricien 24/7 | Montréal — Réponse Immédiate",
  description:
    "Appel d'urgence électricien à Montréal: réponse immédiate, moins d'une heure, diagnostic gratuit. Disponible jour et nuit, 7 jours/semaine.",
  alternates: { canonical: "/contact" },
};

const featuredTestimonials = testimonials.slice(0, 3);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Appel d'urgence 24/7"
        description="Panne électrique, disjoncteur qui déclenche, danger imminent : appel immédiat, réponse en moins d'une heure, diagnostic gratuit, prix transparent."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <SectionContainer className="py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="card-shadow rounded-3xl border border-navy-100 p-6 sm:p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-amber-600" />
                  <a href={`tel:${site.phone}`} className="text-navy-800 hover:text-amber-700">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-amber-600" />
                  <a href={`mailto:${site.email}`} className="text-navy-800 hover:text-amber-700">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-amber-600" />
                  <span className="text-navy-800">
                    {site.address.street}, {site.address.city} ({site.address.region})
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-amber-600" />
                  <span className="text-navy-800">{site.hours}</span>
                </li>
              </ul>
            </div>

            <div className="card-shadow flex flex-1 flex-col gap-5 rounded-3xl border border-navy-100 p-6 sm:p-8">
              <p className="font-heading text-sm text-navy-900">Ce que disent nos clients</p>
              {featuredTestimonials.map((t, i) => (
                <div key={t.name} className={i > 0 ? "border-t border-navy-100 pt-4" : ""}>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-navy-600">&laquo; {t.quote} &raquo;</p>
                  <p className="mt-2 text-xs font-semibold text-navy-800">
                    {t.name}, {t.company}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shadow flex h-full flex-col justify-center rounded-3xl border border-navy-100 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
