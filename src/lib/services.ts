import type { LucideIcon } from "lucide-react";
import { Zap, Shield, AlertCircle, Plug, Wrench, Lightbulb } from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string[];
  features: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "depannage-urgence",
    icon: Zap,
    name: "Dépannage d'urgence 24/7",
    shortDescription: "Panne soudaine ? On arrive en moins d'une heure.",
    heroDescription:
      "Panne électrique à Montréal, c'est pas le moment pour attendre au lundi. Nous intervenons 24 heures sur 24 : diagnostic gratuit et prix transparent avant toute réparation.",
    metaTitle: "Dépannage électrique urgence 24/7 Montréal | CMEQ",
    metaDescription:
      "Dépannage électrique d'urgence 24/7 à Montréal : réponse en moins d'une heure, diagnostic gratuit, prix transparent. Électricien licencié CMEQ.",
    keywords: [
      "dépannage électrique urgence montréal",
      "électricien 24/7 montréal",
      "panne électrique soudaine montréal",
      "disjoncteur saute montréal",
    ],
    intro: [
      "Une panne électrique à Montréal peut survenir n'importe quand : à 3 h du matin un dimanche, un vendredi soir juste avant un événement important, ou un jour de tempête quand personne d'autre n'est disponible. Nous répondons à tous les appels d'urgence 24 heures sur 24, 7 jours sur 7.",
      "Notre approche est simple : appel immédiat, diagnostic gratuit sur place, prix transparent avant toute réparation, et garantie de réponse en moins d'une heure au Grand Montréal.",
    ],
    features: [
      {
        title: "Diagnostic du problème électrique sur place",
        description: "Identification rapide et précise de la source de la panne.",
      },
      {
        title: "Localisation exacte (panne, surcharge, défaut)",
        description: "Je te dis d'emblée ce qui se passe et le coût avant d'intervenir.",
      },
      {
        title: "Réparation ou remplacement du composant défectueux",
        description: "Solutions durables et conformes CMEQ.",
      },
      {
        title: "Tests de sécurité et vérification de conformité",
        description: "Assurance que tout fonctionne sans danger.",
      },
    ],
    process: [
      {
        title: "Appel immédiat",
        description: "Tu m'appelles, je réponds ou je rappelle en moins de 5 minutes.",
      },
      {
        title: "Diagnostic sur place",
        description: "Arrivée garantie en moins d'une heure, diagnostic gratuit.",
      },
      {
        title: "Devis avant réparation",
        description: "Je te dis exactement ce qui se passe et le coût exact.",
      },
      {
        title: "Réparation et vérification",
        description: "Tests de sécurité et facture détaillée avant de partir.",
      },
    ],
    faq: [
      {
        question: "Quel est le délai d'arrivée en urgence ?",
        answer:
          "Une heure maximum à partir de l'appel, 24 heures sur 24, 7 jours sur 7. Montréal, Laval, Longueuil, Brossard, Terrebonne et région.",
      },
      {
        question: "Y a-t-il des frais supplémentaires la nuit ou le week-end ?",
        answer: "Non. Pas de surcharge pour urgence. Tu paies le diagnostic + la réparation, c'est tout.",
      },
      {
        question: "Est-ce que vous acceptez les cartes de crédit ?",
        answer: "Oui, Visa, Mastercard et argent comptant.",
      },
    ],
  },
  {
    slug: "panneau-electrique",
    icon: Shield,
    name: "Mise à jour panneau électrique",
    shortDescription: "Panneau 100 A sur du 200 A ? On l'upgrade en conformité.",
    heroDescription:
      "Un panneau électrique de 100 A à Montréal, c'est pas assez pour 2024 : chauffage électrique, climatisation, bornes de recharge, lave-vaisselle + sécheuse = surcharge constante. Nous upgrads les panneaux de 100 A à 200 A en conformité CMEQ.",
    metaTitle: "Remplacement panneau électrique Montréal | Upgrade 100A 200A",
    metaDescription:
      "Remplacement et upgrade panneau électrique 100A à 200A à Montréal, permis Hydro-Québec inclus, conformité CMEQ.",
    keywords: [
      "remplacement panneau électrique montréal",
      "upgrade 100A 200A montréal",
      "panneau électrique surcharge montréal",
    ],
    intro: [
      "Si ton panneau électrique déclenche souvent, c'est probablement parce que la capacité de 100 A n'est pas suffisante pour tous tes appareils modernes. Une mise à niveau à 200 A résout le problème pour les années à venir.",
    ],
    features: [
      {
        title: "Évaluation de la structure et du câblage",
        description: "Vérification complète avant travaux.",
      },
      {
        title: "Installation panneau 200 A homologué CSA",
        description: "Équipement neuf et certifié.",
      },
      {
        title: "Redistribution des circuits",
        description: "Optimisation du nouveau panneau.",
      },
      {
        title: "Permis Hydro-Québec inclus",
        description: "On s'occupe de toutes les démarches.",
      },
    ],
    process: [
      {
        title: "Visite et évaluation",
        description: "On mesure ta consommation actuelle et tes besoins futurs.",
      },
      {
        title: "Planification",
        description: "On te montre où va aller le nouveau panneau.",
      },
      {
        title: "Permis et coordination",
        description: "On s'occupe du permis Hydro-Québec.",
      },
      {
        title: "Installation et inspection",
        description: "Installation complète avec inspection CMEQ finale.",
      },
    ],
    faq: [
      {
        question: "Combien de temps ça prend ?",
        answer: "Un jour typiquement si t'es pas en zone de congestion Hydro-Québec.",
      },
      {
        question: "Puis-je utiliser ma maison pendant les travaux ?",
        answer: "Oui, sauf le moment de la coupure avec Hydro-Québec — généralement 2 à 4 heures.",
      },
    ],
  },
  {
    slug: "remplacement-disjoncteur",
    icon: AlertCircle,
    name: "Remplacement disjoncteur",
    shortDescription: "Disjoncteur déclenche à répétition ? On le remplace.",
    heroDescription:
      "Un disjoncteur qui déclenche constamment à Montréal, c'est le signe d'un problème : court-circuit, surcharge, défaut. Nous identifions la cause, remplaçons le disjoncteur défectueux et assurons la conformité CMEQ.",
    metaTitle: "Remplacement disjoncteur Montréal | Disjoncteur qui déclenche",
    metaDescription:
      "Remplacement disjoncteur électrique à Montréal : diagnostic du problème, remplacement conforme CMEQ, tests de sécurité.",
    keywords: [
      "remplacement disjoncteur montréal",
      "disjoncteur qui déclenche montréal",
      "disjoncteur électrique défectueux",
    ],
    intro: [
      "Si ton disjoncteur déclenche à répétition, c'est qu'il y a un problème : surcharge, court-circuit, ou le disjoncteur lui-même est défectueux. On diagnostique et on répare.",
    ],
    features: [
      {
        title: "Diagnostic du circuit défectueux",
        description: "Identification de la cause réelle.",
      },
      {
        title: "Remplacement disjoncteur homologué CSA",
        description: "Équipement neuf et conforme.",
      },
      {
        title: "Tests de sécurité post-remplacement",
        description: "Vérification que tout fonctionne correctement.",
      },
      {
        title: "Explication des résultats",
        description: "Tu comprends exactement ce qui s'est passé.",
      },
    ],
    process: [
      {
        title: "Appel ou visite rapide",
        description: "Diagnostic sur place ou par téléphone.",
      },
      {
        title: "Identification du problème",
        description: "Test du circuit et localisation du défaut.",
      },
      {
        title: "Remplacement du disjoncteur",
        description: "Installation d'un disjoncteur conforme CMEQ.",
      },
      {
        title: "Vérification finale",
        description: "Tests sans déclenchement anormal.",
      },
    ],
    faq: [
      {
        question: "Comment je sais si mon disjoncteur est défectueux ?",
        answer: "S'il déclenche sans raison ou s'il y a une odeur de brûlé autour, c'est mauvais signe.",
      },
      {
        question: "Est-ce dangereux d'attendre ?",
        answer: "Oui. Un disjoncteur qui ne protège plus correctement peut laisser passer un courant dangereux.",
      },
    ],
  },
  {
    slug: "installation-prise-interrupteur",
    icon: Plug,
    name: "Installation prise/interrupteur",
    shortDescription: "Nouvelle prise USB, interrupteur variateur, ou chauffage 240 V ?",
    heroDescription:
      "Une nouvelle prise ou un nouvel interrupteur à Montréal paraît simple, mais c'est pas un travail à faire soi-même — le câblage doit être conforme CMEQ, les charges doivent être respectées.",
    metaTitle: "Installation prise interrupteur Montréal | Électricien CMEQ",
    metaDescription:
      "Installation prise électrique, interrupteur, variateur, chauffage 240V à Montréal. Conformité CMEQ, diagnostic gratuit.",
    keywords: [
      "installation prise électrique montréal",
      "installation interrupteur montréal",
      "prise 240V montréal",
    ],
    intro: [
      "Installer une prise ou un interrupteur correctement, c'est plus que visser deux fils. La mise à la terre, la charge du circuit, et la conformité CMEQ sont essentielles.",
    ],
    features: [
      {
        title: "Repérage du circuit existant",
        description: "Ou création d'un nouveau circuit si nécessaire.",
      },
      {
        title: "Passage du câble depuis le panneau",
        description: "Câblage propre et protégé.",
      },
      {
        title: "Installation de la prise ou interrupteur",
        description: "Mise à la terre conforme CMEQ.",
      },
      {
        title: "Tests de sécurité et conformité",
        description: "Vérification complète avant de partir.",
      },
    ],
    process: [
      {
        title: "Évaluation du besoin",
        description: "Tu me dis ce que tu veux et où.",
      },
      {
        title: "Repérage du câblage",
        description: "On voit quel circuit on peut utiliser.",
      },
      {
        title: "Installation",
        description: "Passage du câble, installation, mise à la terre.",
      },
      {
        title: "Tests finaux",
        description: "Conformité CMEQ vérifiée.",
      },
    ],
    faq: [
      {
        question: "Je peux faire ça moi-même ?",
        answer:
          "Techniquement oui, mais si tu fais une erreur, c'est dangereux et ton assurance ne couvre pas.",
      },
      {
        question: "Est-ce un permis de la Ville ?",
        answer: "Parfois. Une prise simple : probablement non. Un circuit 240 V neuf : probablement oui.",
      },
    ],
  },
  {
    slug: "diagnostique-electrique",
    icon: Wrench,
    name: "Diagnostic électrique complet",
    shortDescription: "Inspection de l'installation électrique : danger caché, conformité.",
    heroDescription:
      "Une inspection électrique complète à Montréal est essentielle avant d'acheter une vieille maison ou après une panne. Nous testons tous les circuits, le panneau, la mise à la terre, la conformité CMEQ et nous identifions les risques imminents.",
    metaTitle: "Diagnostic électrique complet Montréal | Inspection maison",
    metaDescription:
      "Diagnostic électrique complet à Montréal : inspection panneau, tests circuits, conformité CMEQ, rapport détaillé.",
    keywords: [
      "diagnostic électrique montréal",
      "inspection électrique maison montréal",
      "conformité électrique montréal",
    ],
    intro: [
      "Un diagnostic électrique avant d'acheter une maison, c'est la même chose qu'une inspection en home inspection. Ça te montre les vrais problèmes et te protège contre les surprises coûteuses.",
    ],
    features: [
      {
        title: "Inspection visuelle complète du panneau",
        description: "Tous les circuits et connexions vérifiés.",
      },
      {
        title: "Tests d'ampérage et de tension",
        description: "Mesures sur points clés selon normes CMEQ.",
      },
      {
        title: "Vérification de la mise à la terre",
        description: "Test continuité et sécurité.",
      },
      {
        title: "Rapport détaillé écrit avec photos",
        description: "Recommandations claires et priorités de réparation.",
      },
    ],
    process: [
      {
        title: "Visite complète",
        description: "Tests tous les circuits, panneau, prises, interrupteurs.",
      },
      {
        title: "Mesures électriques",
        description: "Tension, ampérage, mise à la terre.",
      },
      {
        title: "Documentation",
        description: "Photos des zones problématiques.",
      },
      {
        title: "Rapport écrit",
        description: "Détail complet avec priorités de réparation.",
      },
    ],
    faq: [
      {
        question: "Un diagnostic, c'est long ?",
        answer: "Environ 1 à 2 heures pour une maison complète.",
      },
      {
        question: "Est-ce que le rapport m'aide à négocier un prix ?",
        answer: "Oui, un diagnostic montre les vrais coûts de réparation.",
      },
    ],
  },
  {
    slug: "travaux-electricite",
    icon: Lightbulb,
    name: "Travaux électriques généraux",
    shortDescription: "Rénovation électrique maison, addition d'un circuit chauffage.",
    heroDescription:
      "Rénover une cuisine, ajouter une pièce ou installer un chauffage électrique demande souvent un circuit supplémentaire conforme CMEQ à Montréal. Nous tirons des câbles, créons des circuits, installons l'équipement et nous assurons que tout est légal.",
    metaTitle: "Travaux électriques rénovation Montréal | Circuit chauffage",
    metaDescription:
      "Travaux électriques rénovation, ajout circuits, chauffage 240V à Montréal. Conformité CMEQ, permis inclus.",
    keywords: [
      "travaux électriques montréal",
      "rénovation électrique montréal",
      "circuit chauffage montréal",
    ],
    intro: [
      "Une rénovation, c'est souvent l'occasion de mettre à jour l'électricité. Un nouveau circuit, un chauffage électrique, ou des prises dans une nouvelle pièce — tout ça doit être fait en conformité CMEQ.",
    ],
    features: [
      {
        title: "Planification des circuits selon normes CMEQ",
        description: "Étude complète avant travaux.",
      },
      {
        title: "Passage du câble depuis le panneau",
        description: "Câblage en conduit protégé et conforme.",
      },
      {
        title: "Installation des prises et interrupteurs",
        description: "Mise à la terre et protection complète.",
      },
      {
        title: "Permis et inspection CMEQ inclus",
        description: "Tous les documents officiels en place.",
      },
    ],
    process: [
      {
        title: "Planification",
        description: "On mesure et on regarde ce qui doit être fait.",
      },
      {
        title: "Permis (si requis)",
        description: "On demande auprès de la Ville.",
      },
      {
        title: "Câblage brut",
        description: "Passage des câbles depuis le panneau.",
      },
      {
        title: "Installation et inspection",
        description: "Prises, interrupteurs, tests finaux et inspection CMEQ.",
      },
    ],
    faq: [
      {
        question: "Est-ce que je dois fermer le circuit pour les travaux ?",
        answer: "Oui, pendant le câblage. Mais après, tout fonctionne normalement.",
      },
      {
        question: "Faut-il un permis pour ajouter une prise ?",
        answer: "Une ou deux prises : non. Un circuit complet ou du 240 V : probablement oui.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
