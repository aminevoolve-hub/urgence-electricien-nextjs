import { Zap, Shield, AlertCircle, Plug, Wrench, Lightbulb } from "lucide-react";

export const EMERGENCY_SERVICES = [
  {
    id: 1,
    slug: "depannage-urgence",
    title: "Dépannage d'urgence 24/7",
    icon: Zap,
    description: "Panne soudaine ? On arrive en moins d'une heure.",
    shortDescription:
      "Intervention immédiate pour panne électrique soudaine, disjoncteur déclenché, ou danger imminent.",
    keywords: [
      "dépannage électrique urgence montréal",
      "électricien 24/7",
      "panne électrique urgente",
    ],
    fullDescription: `Une panne électrique à Montréal, c'est pas le moment pour attendre au lundi. Nous intervenons 24 heures sur 24 : diagnostic gratuit et prix transparent avant toute réparation.

Électricien licencié CMEQ depuis [FILL], avec [FILL] ans d'expérience en dépannage résidentiel.`,
    includesList: [
      "Diagnostic du problème électrique sur place",
      "Localisation de la source (panne, surcharge, défaut)",
      "Réparation ou remplacement du composant défectueux",
      "Tests de sécurité et vérification de conformité",
      "Facture détaillée et explications avant de partir",
    ],
    processSteps: [
      {
        title: "Appel immédiat",
        description:
          "Tu m'appelles, tu me décris le problème. Je te donne une heure d'arrivée.",
      },
      {
        title: "Diagnostic sur place",
        description:
          "Je mesure, je localise et je te dis d'emblée ce qui se passe et le coût exact.",
      },
      {
        title: "Réparation",
        description:
          "Réparation ou remplacement du composant défectueux selon ton accord.",
      },
      {
        title: "Vérification",
        description:
          "Tests de sécurité et facture détaillée avant que je parte.",
      },
    ],
    faq: [
      {
        q: "Quel est le délai d'arrivée en urgence ?",
        a: "Une heure maximum à partir de l'appel, 24/7. Si je suis déjà sur un chantier, je te le dis honnêtement.",
      },
      {
        q: "Y a-t-il des frais supplémentaires la nuit ou le week-end ?",
        a: "Non. Pas de surcharge pour urgence. Tu paies le diagnostic + la réparation, c'est tout.",
      },
      {
        q: "Est-ce que vous acceptez les cartes de crédit ?",
        a: "Oui, Visa, Mastercard et argent comptant.",
      },
    ],
  },
  {
    id: 2,
    slug: "panneau-electrique",
    title: "Mise à jour panneau électrique",
    icon: Shield,
    description: "Panneau 100 A sur du 200 A ? On l'upgrade en conformité.",
    shortDescription:
      "Upgrade du panneau de 100 A à 200 A avec permis Hydro-Québec inclus.",
    keywords: [
      "remplacement panneau électrique montréal",
      "upgrade 100A 200A",
      "panneau électrique conformité",
    ],
    fullDescription: `Un panneau électrique de 100 A à Montréal, c'est pas assez pour 2024 : chauffage électrique, climatisation, bornes de recharge, lave-vaisselle + sécheuse = surcharge constante. Nous upgrads les panneaux de 100 A à 200 A en conformité CMEQ.`,
    includesList: [
      "Évaluation de la structure, du câblage existant et des besoins",
      "Mise en place d'un panneau principal 200 A homologué CSA",
      "Redistribution des circuits à partir du nouveau panneau",
      "Déplacement du compteur si nécessaire",
      "Travaux de conformité CMEQ",
      "Permis auprès de la régie (Hydro-Québec) inclus",
      "Inspection par électricien CMEQ homologué",
    ],
    processSteps: [
      {
        title: "Visite et évaluation",
        description: "On mesure ta consommation actuelle et tes besoins futurs.",
      },
      {
        title: "Planification",
        description:
          "On te montre où va aller le nouveau panneau et comment les circuits seront redistribués.",
      },
      {
        title: "Permis",
        description: "On s'occupe du permis auprès d'Hydro-Québec.",
      },
      {
        title: "Installation et inspection",
        description:
          "Installation du nouveau panneau, travaux de conformité CMEQ, inspection finale.",
      },
    ],
    faq: [
      {
        q: "Combien de temps ça prend ?",
        a: "Un jour typiquement si t'es pas en zone de congestion Hydro-Québec.",
      },
      {
        q: "Est-ce un permis de la Ville ?",
        a: "Non, un permis d'Hydro-Québec (la régie). On s'en occupe entièrement.",
      },
      {
        q: "Puis-je utiliser ma maison pendant les travaux ?",
        a: "Oui, sauf le moment de la coupure avec Hydro-Québec — généralement 2 à 4 heures.",
      },
    ],
  },
  {
    id: 3,
    slug: "remplacement-disjoncteur",
    title: "Remplacement disjoncteur",
    icon: AlertCircle,
    description: "Disjoncteur déclenche à répétition ? On le remplace.",
    shortDescription:
      "Remplacement de disjoncteur défectueux en conformité CMEQ.",
    keywords: [
      "remplacement disjoncteur montréal",
      "disjoncteur déclenche",
      "disjoncteur électrique",
    ],
    fullDescription: `Un disjoncteur qui déclenche constamment à Montréal, c'est le signe d'un problème : court-circuit, surcharge, défaut. Nous identifions la cause, remplaçons le disjoncteur défectueux et assurons la conformité CMEQ.`,
    includesList: [
      "Diagnostic du circuit défectueux",
      "Identification de la cause (court-circuit, surcharge, défaut)",
      "Remplacement du disjoncteur par un modèle homologué CSA",
      "Tests de sécurité post-remplacement",
      "Explication des résultats",
    ],
    processSteps: [
      {
        title: "Appel ou visite rapide",
        description:
          "Tu me décris le problème ou je viens faire un diagnostic.",
      },
      {
        title: "Diagnostic",
        description: "Je teste le circuit et j'identifie ce qui ne va pas.",
      },
      {
        title: "Remplacement",
        description:
          "Je remplace le disjoncteur par un modèle conforme CMEQ.",
      },
      {
        title: "Tests finaux",
        description:
          "Je vérifie que tout fonctionne sans déclenchement.",
      },
    ],
    faq: [
      {
        q: "Comment je sais si mon disjoncteur est défectueux ?",
        a: "S'il déclenche sans raison ou s'il y a une odeur de brûlé autour, c'est mauvais signe.",
      },
      {
        q: "Est-ce dangereux d'attendre ?",
        a: "Oui. Un disjoncteur qui ne protège plus correctement peut laisser passer un courant dangereux.",
      },
      {
        q: "Je peux remplacer mon disjoncteur moi-même ?",
        a: "Non, légalement en Québec, ça doit être fait par un électricien licencié CMEQ.",
      },
    ],
  },
  {
    id: 4,
    slug: "installation-prise-interrupteur",
    title: "Installation prise/interrupteur",
    icon: Plug,
    description:
      "Nouvelle prise USB, interrupteur variateur, ou chauffage 240 V ?",
    shortDescription:
      "Installation de prise électrique, interrupteur, variateur en conformité CMEQ.",
    keywords: [
      "installation prise électrique montréal",
      "installation interrupteur",
      "prise 240V",
    ],
    fullDescription: `Une nouvelle prise ou un nouvel interrupteur à Montréal paraît simple, mais c'est pas un travail à faire soi-même — le câblage doit être conforme CMEQ, les charges doivent être respectées. Nous installons des prises, des interrupteurs, des variateurs et des circuits 240 V selon les normes actuelles.`,
    includesList: [
      "Repérage du circuit existant ou création d'un nouveau circuit",
      "Passage du câble depuis le panneau au nouveau point",
      "Installation de la prise ou de l'interrupteur",
      "Mise à la terre conforme (CMEQ)",
      "Tests de sécurité et conformité",
    ],
    processSteps: [
      {
        title: "Évaluation du besoin",
        description:
          "Tu me dis ce que tu veux (prise USB, variateur, 240 V) et où.",
      },
      {
        title: "Repérage du câblage",
        description:
          "Je vois quel circuit on peut utiliser ou si on doit en créer un nouveau.",
      },
      {
        title: "Installation",
        description:
          "Passage du câble, installation de la prise ou interrupteur, mise à la terre.",
      },
      {
        title: "Tests finaux",
        description: "Conformité CMEQ vérifiée avant de partir.",
      },
    ],
    faq: [
      {
        q: "Combien ça coûte d'ajouter une prise 240 V pour une sécheuse ?",
        a: "[FILL: ton vrai prix]. Ça dépend si un circuit 240 V existe déjà.",
      },
      {
        q: "Est-ce un permis de la Ville ?",
        a: "Parfois. Une prise simple : probablement non. Un circuit 240 V neuf : probablement oui.",
      },
      {
        q: "Je peux faire ça moi-même ?",
        a: "Techniquement oui, mais si tu fais une erreur, c'est dangereux et ton assurance ne couvre pas.",
      },
    ],
  },
  {
    id: 5,
    slug: "diagnostique-electrique",
    title: "Diagnostic électrique complet",
    icon: Wrench,
    description: "Inspection de l'installation électrique : danger caché, conformité.",
    shortDescription:
      "Inspection complète de l'installation électrique avec rapport détaillé.",
    keywords: [
      "diagnostic électrique montréal",
      "inspection électrique maison",
      "conformité électrique",
    ],
    fullDescription: `Une inspection électrique complète à Montréal est essentielle avant d'acheter une vieille maison ou après une panne. Nous testons tous les circuits, le panneau, la mise à la terre, la conformité CMEQ et nous identifions les risques imminents.`,
    includesList: [
      "Inspection visuelle complète du panneau et de tous les circuits",
      "Tests d'ampérage et de tension sur points clés",
      "Vérification de la mise à la terre (test continuité)",
      "Contrôle de la conformité aux normes CMEQ actuelles",
      "Identification des risques imminents",
      "Rapport détaillé écrit avec photos et recommandations",
    ],
    processSteps: [
      {
        title: "Visite complète",
        description:
          "Je teste tous les circuits, le panneau, les prises, les interrupteurs.",
      },
      {
        title: "Mesures électriques",
        description:
          "Tension, ampérage, mise à la terre selon les normes CMEQ.",
      },
      {
        title: "Documentation",
        description:
          "Photos des zones problématiques et relevé des défauts.",
      },
      {
        title: "Rapport écrit",
        description:
          "Un rapport détaillé avec priorités de réparation et coûts estimés.",
      },
    ],
    faq: [
      {
        q: "Un diagnostic, c'est long ?",
        a: "Environ 1 à 2 heures pour une maison complète.",
      },
      {
        q: "Est-ce que le rapport m'aide à négocier un prix ?",
        a: "Oui, un diagnostic montre les vrais coûts de réparation.",
      },
      {
        q: "Et si je vois que tout va bien ?",
        a: "C'est bon signe. Tu auras quand même un rapport écrit qui prouve la conformité.",
      },
    ],
  },
  {
    id: 6,
    slug: "travaux-electricite",
    title: "Travaux électriques généraux",
    icon: Lightbulb,
    description: "Rénovation électrique maison, addition d'un circuit chauffage.",
    shortDescription:
      "Travaux électriques de rénovation avec circuits supplémentaires et conformité CMEQ.",
    keywords: [
      "travaux électriques montréal",
      "rénovation électrique",
      "circuit chauffage",
    ],
    fullDescription: `Rénover une cuisine, ajouter une pièce ou installer un chauffage électrique demande souvent un circuit supplémentaire conforme CMEQ à Montréal. Nous tirons des câbles, créons des circuits, installons l'équipement et nous assurons que tout est légal.`,
    includesList: [
      "Planification des circuits selon les normes CMEQ",
      "Passage du câble depuis le panneau jusqu'aux points d'utilisation",
      "Installation des boîtes de jonction, câblage en conduit conforme",
      "Disjoncteurs et prises/interrupteurs installés",
      "Tests de sécurité et vérification de conformité",
      "Permis auprès de la Ville, inspection CMEQ inclus",
    ],
    processSteps: [
      {
        title: "Planification",
        description:
          "On mesure, on regarde ce qui doit être fait et où ça se branche.",
      },
      {
        title: "Permis",
        description:
          "On demande le permis auprès de la Ville si c'est requis.",
      },
      {
        title: "Câblage brut",
        description:
          "Passage des câbles depuis le panneau vers les nouveaux circuits.",
      },
      {
        title: "Installation et inspection",
        description:
          "Installation des prises, interrupteurs, tests finaux et inspection CMEQ.",
      },
    ],
    faq: [
      {
        q: "Est-ce que je dois fermer le circuit pour les travaux ?",
        a: "Oui, pendant le câblage. Mais après, tout fonctionne normalement.",
      },
      {
        q: "Faut-il un permis pour ajouter une prise ?",
        a: "Une ou deux prises : non. Un circuit complet ou du 240 V : probablement oui.",
      },
      {
        q: "Ça va prendre combien de temps ?",
        a: "Un jour typiquement pour câblage + installation.",
      },
    ],
  },
];

export type EmergencyService = (typeof EMERGENCY_SERVICES)[0];
