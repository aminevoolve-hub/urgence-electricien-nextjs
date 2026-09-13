export const site = {
  name: "Urgence Électricien MTL",
  shortName: "Urgence Électricien",
  url: "https://urgence-electricien-mtl.vercel.app",
  phone: "+14383384113",
  phoneDisplay: "(438) 338-4113",
  email: "urgence@electricienmtl.com",
  address: {
    street: "Montréal",
    city: "Montréal",
    region: "QC",
    postalCode: "H1V 1K5",
    country: "CA",
  },
  cmeq: "[FILL: numéro CMEQ]",
  hours: "24 heures sur 24, 7 jours sur 7, 365 jours par année",
  serviceArea:
    "Montréal, Laval, Longueuil, Brossard, Terrebonne, Rive-Sud, Rive-Nord",
  social: {
    google: "https://www.google.com/maps",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com",
  },
  googleRating: 4.9,
  googleReviewCount: 12,
  founded: 2010,
} as const;

export const stats = [
  { value: 0, suffix: "+", label: "heures attente maximum" },
  { value: 100, suffix: "%", label: "diagnostic gratuit" },
  { value: 0, suffix: "%", label: "surcharge urgence" },
  { value: 24, suffix: "/7", label: "disponibilité" },
];
