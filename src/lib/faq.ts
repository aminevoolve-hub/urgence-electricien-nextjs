import { ShieldCheck, Clock3, GraduationCap, Handshake } from "lucide-react";

export const homeFaq = [
  {
    question: "Quel est le délai d'arrivée en urgence ?",
    answer:
      "Une heure maximum à partir de l'appel, 24 heures sur 24, 7 jours sur 7. Montréal, Laval, Longueuil, Terrebonne, Brossard et région.",
  },
  {
    question: "Est-ce que vous êtes licencié CMEQ ?",
    answer:
      "Oui, électricien licencié CMEQ avec assurance complète. Tous les travaux sont conformes aux normes actuelles, inspection incluse si requis.",
  },
  {
    question: "Y a-t-il des frais supplémentaires la nuit ou le week-end ?",
    answer: "Non. Pas de surcharge pour urgence. Le prix reste le même 24/7, 365 jours par année.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Diagnostic gratuit. Je te dis d'emblée ce qui se passe et le coût exact avant d'intervenir. Visa, Mastercard et argent comptant acceptés.",
  },
  {
    question: "Je peux vous appeler n'importe quand ?",
    answer:
      "Oui, appel d'urgence accepté à tout moment. Panne, disjoncteur qui saute, situation dangereuse : on arrive en moins d'une heure.",
  },
];

export const contactFaq = [
  {
    question: "Quel est le délai de réponse à un appel ?",
    answer:
      "Réponse immédiate sur l'appel ou rappel en moins de 5 minutes. Arrivée garantie en moins d'une heure pour les urgences.",
  },
  {
    question: "Puis-je obtenir un devis par téléphone ?",
    answer:
      "Pour un diagnostic complet, je dois voir le problème sur place. Appel gratuit, diagnostic gratuit, devis avant toute réparation.",
  },
  {
    question: "Acceptez-vous les cartes de crédit ?",
    answer:
      "Oui, Visa, Mastercard et argent comptant. Facture détaillée remise avant de partir.",
  },
  {
    question: "Couvrez-vous d'autres zones ?",
    answer:
      "Oui, réponse en moins d'une heure à Montréal, Laval, Longueuil, Brossard, Terrebonne et régions avoisinantes.",
  },
];

export const whyUs = [
  {
    title: "Réponse garantie en moins d'une heure",
    description:
      "Appel d'urgence accepté à tout moment. Une heure maximum à partir du moment où tu appelles.",
  },
  {
    title: "Électricien licencié CMEQ",
    description:
      "Travaux conformes aux normes actuelles, assurance complète, inspection CMEQ incluse si requis.",
  },
  {
    title: "Diagnostic gratuit, prix transparent",
    description:
      "Je vois le problème, je te dis d'emblée ce qui se passe et le coût exact avant d'intervenir.",
  },
  {
    title: "Pas de surcharge pour urgence",
    description:
      "Prix régulier 24/7, 365 jours par année. Ni frais de nuit, ni frais de fin de semaine.",
  },
];

export const values = [
  {
    slug: "rapidite",
    icon: Clock3,
    title: "Rapidité",
    description: "Arrivée garantie en moins d'une heure, diagnostic gratuit, prix transparent avant réparation.",
  },
  {
    slug: "securite",
    icon: ShieldCheck,
    title: "Sécurité",
    description: "Électricien licencié CMEQ, travaux conformes, assurance complète pour votre protection.",
  },
  {
    slug: "honnete",
    icon: Handshake,
    title: "Honnêteté",
    description: "Pas de surcharge pour urgence, tarification transparente, facture détaillée sans surprise.",
  },
  {
    slug: "disponibilite",
    icon: GraduationCap,
    title: "Disponibilité",
    description: "24 heures sur 24, 7 jours sur 7, 365 jours par année pour les pannes électriques.",
  },
];

export const processSteps = [
  { title: "Appel immédiat", description: "Tu m'appelles, je réponds ou je te rappelle en moins de 5 minutes." },
  { title: "Arrivée rapide", description: "Je suis sur place en moins d'une heure, diagnostic gratuit." },
  { title: "Devis avant réparation", description: "Je te dis exactement ce qui se passe et le coût avant d'intervenir." },
  { title: "Réparation", description: "Réparation ou remplacement selon ton accord, travaux conformes CMEQ." },
  { title: "Vérification finale", description: "Tests de sécurité, facture détaillée, explications avant de partir." },
];
