# Électricien Commercial SC

Site marketing Next.js pour un électricien commercial et industriel à Montréal.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · `motion` · `lucide-react`.

Le contenu (services, blog, réalisations, témoignages, FAQ) est codé en dur dans `src/lib/*.ts`.
Aucune base de données : seuls le formulaire de contact et les images uploadées sont dynamiques.

## Images sans redéploiement

Déposez vos images dans `public/images/{section}/` (`hero`, `services`, `projects`, `team`, `blog`)
avec le nom exact attendu par `src/lib/*.ts` (voir le champ `image`). Un placeholder s'affiche tant
qu'aucun fichier ne correspond — voir `src/lib/images.ts`.

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

- `NEXT_PUBLIC_GA_ID` — Google Analytics
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID` — journalisation des soumissions dans Google Sheets
- `BREVO_API_KEY`, `CONTACT_EMAIL_TO` — envoi du courriel de notification via Brevo

## Développement

```bash
npm install
npm run dev
```

`npm run build` et `npm run lint` doivent passer sans erreur avant tout déploiement.
