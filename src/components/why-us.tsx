import { CheckCircle2 } from "lucide-react";
import { whyUs } from "@/lib/faq";
import SectionContainer from "./section-container";
import Reveal from "./reveal";
import AnimatedHeading from "./animated-heading";
import ImageSlot from "./image-slot";

export default function WhyUs() {
  return (
    <section className="py-20">
      <SectionContainer className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col">
          <AnimatedHeading as="h2" text="Pourquoi m'appeler en urgence" className="font-heading text-3xl text-navy-900" />
          <p className="mt-4 text-navy-600">
            3 h du matin un dimanche, panne électrique, disjoncteur qui déclenche à répétition : appel immédiat, diagnostic gratuit, réponse garantie en moins d'une heure.
          </p>
          <ImageSlot section="home" name="pourquoi-nous-choisir" alt="Dépannage électrique d'urgence" className="mt-6 flex-1 w-full" />
        </div>
        <div className="space-y-4">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="flex gap-4 card-shadow rounded-2xl bg-navy-50 p-5">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <p className="font-heading text-base text-navy-900">{item.title}</p>
                <p className="mt-1 text-sm text-navy-600">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
