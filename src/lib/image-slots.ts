import { blogPosts } from "./blog";
import { values } from "./faq";
import { projects } from "./projects";
import { services } from "./services";

export type ImageSlotDef = {
  section: string;
  name: string;
  label: string;
  hint?: string;
};

export type ImageSlotGroup = {
  id: string;
  label: string;
  slots: ImageSlotDef[];
};

export const imageSlotGroups: ImageSlotGroup[] = [
  {
    id: "marque",
    label: "Marque",
    slots: [{ section: "brand", name: "logo", label: "Logo", hint: "En-tête, menu mobile et pied de page" }],
  },
  {
    id: "accueil",
    label: "Accueil",
    slots: [
      { section: "home", name: "pourquoi-nous-choisir", label: "Pourquoi nous choisir" },
      ...values.map((v) => ({
        section: "valeurs",
        name: v.slug,
        label: `Valeur — ${v.title}`,
        hint: "Aussi affichée sur la page À propos",
      })),
    ],
  },
  {
    id: "services",
    label: "Services",
    slots: services.map((s) => ({
      section: "services",
      name: s.slug,
      label: s.name,
      hint: "Carte sur l'accueil et image de la page du service",
    })),
  },
  {
    id: "a-propos",
    label: "À propos",
    slots: [{ section: "about", name: "histoire", label: "Notre histoire" }],
  },
  {
    id: "realisations",
    label: "Réalisations",
    slots: projects.map((p) => ({
      section: "projects",
      name: p.image.replace(/\.[^/.]+$/, ""),
      label: p.title,
    })),
  },
  {
    id: "blog",
    label: "Blog",
    slots: [
      {
        section: "blog",
        name: "blog-electricien-commercial-montreal",
        label: "Image par défaut des articles",
        hint: "Utilisée quand un article n'a pas sa propre image",
      },
      ...blogPosts.map((p) => ({ section: "blog", name: p.slug, label: p.title })),
    ],
  },
];

export function findSlot(section: string, name: string) {
  for (const group of imageSlotGroups) {
    const slot = group.slots.find((s) => s.section === section && s.name === name);
    if (slot) return slot;
  }
  return null;
}
