import type { BlogPost } from "./blog-types";
import { post as electricienUrgence24h } from "@/content/blog/electricien-urgence-montreal-24h-quand-appeler";
import { post as panneNuitQuoiFaire } from "@/content/blog/panne-electrique-nuit-quoi-faire-en-attendant-electricien";
import { post as hydroOuElectricien } from "@/content/blog/hydro-quebec-ou-electricien-qui-appeler-panne";
import { post as coutUrgenceNuit } from "@/content/blog/cout-electricien-urgence-montreal-nuit-fin-de-semaine";
import { post as disjoncteurSaute } from "@/content/blog/disjoncteur-saute-sans-arret-causes-urgence";
import { post as odeurBrule } from "@/content/blog/odeur-brule-electrique-prise-panneau-reagir-vite";
import { post as pannePartielle } from "@/content/blog/moitie-maison-sans-courant-panne-partielle";
import { post as vieuxPanneau } from "@/content/blog/vieux-panneau-fusibles-federal-pioneer-risque-urgence";
import { post as panneHiver } from "@/content/blog/panne-electrique-hiver-chauffage-gel-urgence";
import { post as degatEau } from "@/content/blog/degat-eau-inondation-electricite-que-faire";
import { post as priseChaude } from "@/content/blog/prise-electrique-chaude-ne-fonctionne-plus-danger";
import { post as panneCommerce } from "@/content/blog/panne-electrique-commerce-restaurant-urgence-montreal";

export type { BlogPost, BlogFaq } from "./blog-types";

export const blogCategories = [
  "Urgence électrique",
  "Panne électrique",
  "Panneau & disjoncteurs",
  "Sécurité électrique",
  "Coûts & conseils",
] as const;

// Posts bundled with the site. Posts created or edited from /admin/blog live in Vercel Blob
// and are merged on top of these by `@/lib/blog-store`.
export const blogPosts: BlogPost[] = [
  electricienUrgence24h,
  panneNuitQuoiFaire,
  hydroOuElectricien,
  coutUrgenceNuit,
  disjoncteurSaute,
  odeurBrule,
  pannePartielle,
  vieuxPanneau,
  panneHiver,
  degatEau,
  priseChaude,
  panneCommerce,
];
