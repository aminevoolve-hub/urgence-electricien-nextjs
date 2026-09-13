import { AlertTriangle, DollarSign, Clock, Shield } from "lucide-react";
import SectionContainer from "../section-container";
import Reveal from "../reveal";
import AnimatedHeading from "../animated-heading";

const points = [
  {
    icon: Clock,
    title: "Réponse en moins d'une heure",
    description:
      "Appel d'urgence accepté à tout moment : diagnostic gratuit, prix transparent avant toute réparation.",
  },
  {
    icon: DollarSign,
    title: "Pas de surcharge pour urgence",
    description: "Prix régulier 24/7, 365 jours par année. Ni frais de nuit, ni frais de fin de semaine.",
  },
  {
    icon: AlertTriangle,
    title: "Diagnostic sur place",
    description: "Je vois le problème, je te dis d'emblée ce qui se passe et le coût exact avant d'intervenir.",
  },
  {
    icon: Shield,
    title: "Électricien licencié CMEQ",
    description: "Travaux conformes aux normes actuelles, inspection CMEQ incluse si requis.",
  },
];

export default function IntroSection() {
  return (
    <section className="py-20">
      <SectionContainer>
        <div className="max-w-2xl">
          <AnimatedHeading
            as="h2"
            text="Électricien d'urgence 24/7 à Montréal, licencié CMEQ"
            className="font-heading text-3xl text-navy-900"
          />
          <p className="mt-4 text-navy-600">
            Une panne électrique peut survenir à 3 h du matin un dimanche. Nous répondons 24 heures sur 24, 7 jours sur
            7, au Grand Montréal : diagnostic gratuit, prix transparent, garantie de réponse en moins d'une heure.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="card-shadow rounded-3xl bg-navy-50 p-6">
              <item.icon className="h-8 w-8 text-amber-600" />
              <p className="mt-4 font-heading text-base text-navy-900">{item.title}</p>
              <p className="mt-2 text-sm text-navy-600">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
