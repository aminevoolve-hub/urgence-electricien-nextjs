export type Project = {
  slug: string;
  title: string;
  category: string;
  serviceSlug: string;
  description: string;
  location: string;
  image: string;
};

export const projectCategories = [
  "Installation commerciale",
  "Éclairage",
  "Entretien & sécurité",
  "Bornes de recharge & réseau",
] as const;

export const projects: Project[] = [
  {
    slug: "restaurant-le-bassin",
    title: "Mise à niveau électrique : Restaurant Le Bassin",
    category: "Installation commerciale",
    serviceSlug: "installations-electriques-commerciales",
    description:
      "Remplacement du panneau principal 400A et redistribution des circuits cuisine pour un restaurant du Vieux-Montréal.",
    location: "Montréal, QC",
    image: "restaurant-le-bassin.jpg",
  },
  {
    slug: "clinique-sourire-plus",
    title: "Conversion DEL : Clinique dentaire Sourire Plus",
    category: "Éclairage",
    serviceSlug: "eclairage-commercial-ecoenergetique",
    description:
      "Conversion complète de l'éclairage fluorescent vers DEL avec gradation intelligente dans une clinique de 12 salles.",
    location: "Laval, QC",
    image: "clinique-sourire-plus.jpg",
  },
  {
    slug: "entrepot-distribution-kh",
    title: "Thermographie et entretien : Distribution KH",
    category: "Entretien & sécurité",
    serviceSlug: "entretien-diagnostic-securite-electrique",
    description:
      "Inspection thermographique annuelle d'un entrepôt de 40 000 pi² ayant permis de détecter une connexion défectueuse critique.",
    location: "Longueuil, QC",
    image: "entrepot-kh.jpg",
  },
  {
    slug: "galeries-nord-bornes",
    title: "Bornes de recharge : Les Galeries Nord",
    category: "Bornes de recharge & réseau",
    serviceSlug: "systemes-connectes-reseaux",
    description: "Installation de 6 bornes de recharge niveau 2 dans le stationnement d'un centre commercial.",
    location: "Montréal, QC",
    image: "galeries-nord.jpg",
  },
  {
    slug: "bureaux-fortin-associes",
    title: "Rénovation électrique : Fortin et Associés",
    category: "Installation commerciale",
    serviceSlug: "installations-electriques-commerciales",
    description: "Câblage complet de bureaux professionnels de 8 000 pi² lors d'une rénovation majeure.",
    location: "Montréal, QC",
    image: "bureaux-fortin.jpg",
  },
  {
    slug: "manufacture-girtex-reseau",
    title: "Câblage réseau structuré : Manufacture GirTex",
    category: "Bornes de recharge & réseau",
    serviceSlug: "systemes-connectes-reseaux",
    description: "Déploiement d'un câblage réseau catégorie 6A pour une usine de production textile.",
    location: "Saint-Hyacinthe, QC",
    image: "girtex-reseau.jpg",
  },
  {
    slug: "eclairage-exterieur-galeries-nord",
    title: "Éclairage extérieur et enseignes : Les Galeries Nord",
    category: "Éclairage",
    serviceSlug: "eclairage-commercial-ecoenergetique",
    description: "Remplacement de l'éclairage de stationnement et des enseignes pour un centre commercial complet.",
    location: "Montréal, QC",
    image: "galeries-nord-eclairage.jpg",
  },
  {
    slug: "certification-urgence-tour-affaires",
    title: "Certification éclairage d'urgence : Tour d'affaires",
    category: "Entretien & sécurité",
    serviceSlug: "entretien-diagnostic-securite-electrique",
    description:
      "Test et certification annuelle des systèmes d'éclairage d'urgence dans un immeuble à bureaux de 15 étages.",
    location: "Montréal, QC",
    image: "tour-affaires.jpg",
  },
];
