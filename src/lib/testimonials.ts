export type Testimonial = {
  name: string;
  company: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Stéphane Marchand",
    company: "Villeray, Montréal",
    quote: "Panne électrique à minuit un lundi. Appel immédiat, électricien arrivé en 45 minutes, problème réglé. Pas de surprise sur le prix.",
    rating: 5,
  },
  {
    name: "Marie Gagnon",
    company: "Pointe-aux-Trembles",
    quote: "Disjoncteur qui déclenchait constamment. Diagnostic gratuit, remplacement du disjoncteur le jour même. Très rapide.",
    rating: 5,
  },
  {
    name: "Georges Roy",
    company: "Rosemont",
    quote: "3 h du matin un dimanche, plus de courant. On me dit qu'on arrive en moins d'une heure, et c'est vrai. Merci pour cette fiabilité.",
    rating: 5,
  },
  {
    name: "Lisa Tremblay",
    company: "Longueuil",
    quote: "Urgence électrique un vendredi soir. Prix transparent, pas de frais cachés. C'est rare de trouver ça en urgence.",
    rating: 5,
  },
  {
    name: "Michel Côté",
    company: "Laval",
    quote: "Prise qui faisait sauter le circuit. Électricien licencié CMEQ qui a expliqué le problème et la solution. Tout en ordre.",
    rating: 5,
  },
  {
    name: "Carole Dubois",
    company: "Saint-Léonard",
    quote: "Appel d'urgence accepté sans question un samedi après-midi. Réparation du panneau électrique, facture équitable. Très content.",
    rating: 5,
  },
  {
    name: "André Mercier",
    company: "Terrebonne",
    quote: "Panne électrique chez nous à 22 h un jeudi. Appel immédiat, électricien chez nous en moins d'une heure. Vraiment 24/7.",
    rating: 5,
  },
  {
    name: "Sylvette Lafleur",
    company: "Brossard",
    quote: "Urgence électrique le jour de Noël. On m'a dit qu'on arrivait quand même. Et c'est ce qui s'est passé. Merci beaucoup.",
    rating: 5,
  },
  {
    name: "Patrice Gauvin",
    company: "Anjou",
    quote: "Diagnostique électrique complet sur place, devis exact avant réparation, travaux en conformité CMEQ. Service professionnel.",
    rating: 5,
  },
  {
    name: "Diane Labelle",
    company: "Ahuntsic-Cartierville",
    quote: "Surcharge électrique qui causait des pannes répétées. Diagnostic gratuit, solution proposée, réparation faite le jour même.",
    rating: 5,
  },
  {
    name: "Rémi Gauthier",
    company: "Saint-Hubert",
    quote: "Remplacement de disjoncteur défectueux un dimanche. Appel immédiat, intervention rapide, inspection CMEQ complète. Rassurant.",
    rating: 5,
  },
  {
    name: "Françoise Dubuc",
    company: "Vaudreuil-Dorion",
    quote: "Appel d'urgence accepté à minuit. Électricien licencié arrivé en 55 minutes, problème résolu en moins de 2 heures. Excellent service.",
    rating: 5,
  },
];
