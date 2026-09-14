import type { BlogPost } from "./blog-types";
import { post as coutInstallationCommerciale } from "@/content/blog/cout-installation-electrique-commerciale-montreal";
import { post as signesMiseANiveauPanneau } from "@/content/blog/signes-mise-a-niveau-panneau-electrique-commercial";
import { post as economiesEclairageDel } from "@/content/blog/economies-eclairage-del-commercial";
import { post as thermographieInfrarouge } from "@/content/blog/thermographie-infrarouge-detecter-problemes-avant-panne";
import { post as guideBornesEntreprises } from "@/content/blog/guide-bornes-recharge-ve-entreprises-montreal";
import { post as cablageReseauStructure } from "@/content/blog/cablage-reseau-structure-ce-quun-commerce-doit-savoir";
import { post as frequenceEntretienPreventif } from "@/content/blog/frequence-entretien-electrique-preventif";
import { post as certificationEclairageUrgence } from "@/content/blog/certification-eclairage-urgence-obligations-legales-quebec";
import { post as commercialVsResidentiel } from "@/content/blog/electricien-commercial-vs-residentiel-differences";
import { post as renovationCommerciale } from "@/content/blog/renovation-commerciale-par-ou-commencer-electricite";
import { post as panneMaisonSignes } from "@/content/blog/panne-electrique-maison-7-signes-appeler-urgence";
import { post as panneHiverQuebec } from "@/content/blog/panne-electricite-hiver-quebec-que-faire";
import { post as odeurBruleEtincelles } from "@/content/blog/odeur-brule-etincelles-panneau-rouille-dangers-electriques";
import { post as premiereVisiteResidentiel } from "@/content/blog/premiere-visite-electricien-residentiel-a-quoi-sattendre";
import { post as miseAuxNormesMaisonAncienne } from "@/content/blog/mise-aux-normes-maison-ancienne-panneau-electrique";
import { post as coutResidentielLavalTerrebonne } from "@/content/blog/cout-electricien-residentiel-laval-sherbrooke-terrebonne";
import { post as electricienCertifieRbq } from "@/content/blog/electricien-certifie-rbq-pourquoi-ca-change-tout";
import { post as bornesResidentielLavalTerrebonne } from "@/content/blog/bornes-recharge-ve-residentiel-laval-terrebonne";

export type { BlogPost, BlogFaq } from "./blog-types";

export const blogCategories = [
  "Installation commerciale",
  "Éclairage",
  "Entretien & sécurité",
  "Réseaux & bornes de recharge",
  "Conseils",
  "Urgence électrique",
  "Résidentiel",
] as const;

export const blogPosts: BlogPost[] = [
  coutInstallationCommerciale,
  signesMiseANiveauPanneau,
  economiesEclairageDel,
  thermographieInfrarouge,
  guideBornesEntreprises,
  cablageReseauStructure,
  frequenceEntretienPreventif,
  certificationEclairageUrgence,
  commercialVsResidentiel,
  renovationCommerciale,
  panneMaisonSignes,
  panneHiverQuebec,
  odeurBruleEtincelles,
  premiereVisiteResidentiel,
  miseAuxNormesMaisonAncienne,
  coutResidentielLavalTerrebonne,
  electricienCertifieRbq,
  bornesResidentielLavalTerrebonne,
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
